import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { Table } from '../table/entities/table.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
  ) {}

  async create(dto: CreateZoneDto): Promise<Zone> {
    const zone = this.zoneRepo.create(dto);
    return this.zoneRepo.save(zone);
  }

  async findAll(): Promise<Zone[]> {
    return this.zoneRepo.find({ relations: ['tables'] });
  }

  async findOne(id: number): Promise<Zone> {
    const zone = await this.zoneRepo.findOne({
      where: { id },
      relations: ['tables'],
    });
    if (!zone) throw new NotFoundException('Zone not found');
    return zone;
  }

  async update(id: number, dto: UpdateZoneDto): Promise<Zone> {
    const zone = await this.findOne(id);
    Object.assign(zone, dto);
    return this.zoneRepo.save(zone);
  }

  async remove(id: number): Promise<Zone> {
    const zone = await this.findOne(id);
    return this.zoneRepo.remove(zone);
  }

  async getTablesInZone(id: number): Promise<Table[]> {
    const zone = await this.findOne(id);
    return zone.tables;
  }
  async getStatistics(): Promise<{ zone: string; availableTables: number }[]> {
    const zones = await this.zoneRepo.find({ relations: ['tables'] });
  
    return zones.map((zone) => {
      const available = zone.tables.filter((t) => t.isAvailable).length;
      return {
        zone: zone.name,
        availableTables: available,
      };
    });
  }
  
}
