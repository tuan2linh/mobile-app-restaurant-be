import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { Zone } from '../zone/entities/zone.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const { name, capacity, zoneId } = createTableDto;
  
    const zone = await this.zoneRepo.findOne({ where: { id: zoneId } });
    if (!zone) {
      throw new NotFoundException(`Zone with id ${zoneId} not found`);
    }
  
    const table = this.tableRepository.create({ name, capacity, zone });
    return this.tableRepository.save(table);
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['customer', 'zone'] });
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({
      where: { id },
      relations: ['customer', 'zone'],
    });
    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found`);
    }
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto): Promise<Table> {
    const table = await this.findOne(id);
    Object.assign(table, updateTableDto);
    return this.tableRepository.save(table);
  }

  async remove(id: number): Promise<void> {
    const table = await this.findOne(id);
    await this.tableRepository.remove(table);
  }
  
  async findAvailable(): Promise<Table[]> {
    return this.tableRepository.find({
      where: { isAvailable: true },
      relations: ['zone'],
    });
  }
  
}
