import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const table = this.tableRepository.create(createTableDto);
    return this.tableRepository.save(table);
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({ relations: ['customer'] });
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({
      where: { id },
      relations: ['customer'],
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
}
