import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { Zone } from './entities/zone.entity';
import { Table } from '../table/entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zone, Table])], // 👈 Quan trọng!
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
