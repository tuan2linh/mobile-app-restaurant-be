import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Table } from '../table/entities/table.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, phone, tableId } = createCustomerDto;

    const table = await this.tableRepo.findOne({
      where: { id: tableId },
      relations: ['customer'],
    });

    if (!table) throw new NotFoundException('Table not found');
    if (!table.isAvailable) throw new BadRequestException('Table is not available');

    const customer = this.customerRepo.create({ name, phone, table });
    table.isAvailable = false;

    await this.tableRepo.save(table);
    const savedCustomer = await this.customerRepo.save(customer);
    return {
      id: savedCustomer.id,
      name: savedCustomer.name,
      phone: savedCustomer.phone,
      table: {
        id: table.id,
        name: table.name,
        zone: table.zone || null,
        capacity: table.capacity,
        isAvailable: table.isAvailable
      }
    };
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find({ relations: ['table'] });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['table'],
    });
    if (!customer) throw new NotFoundException();
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    if (customer.table) {
      const table = await this.tableRepo.findOne({ where: { id: customer.table.id } });
      if (table) {
        table.isAvailable = true;
        await this.tableRepo.save(table);
      }
    }
    await this.customerRepo.remove(customer);
  }

  async leaveTable(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer.table) throw new BadRequestException('Customer is not using any table');

    const table = await this.tableRepo.findOne({ where: { id: customer.table.id } });
    if (table) {
      table.isAvailable = true;
      await this.tableRepo.save(table);
    }

    customer.table = null;
    return this.customerRepo.save(customer);
  }
  async assignTable(customerId: number, tableId: number): Promise<Customer> {
    const customer = await this.findOne(customerId);
    const table = await this.tableRepo.findOne({
      where: { id: tableId },
      relations: ['customer'],
    });
  
    if (!table) throw new NotFoundException('Table not found');
    if (!table.isAvailable) throw new BadRequestException('Table is already occupied');
  
    customer.table = table;
    table.isAvailable = false;
  
    await this.tableRepo.save(table);
    return this.customerRepo.save(customer);
  }
  
}
