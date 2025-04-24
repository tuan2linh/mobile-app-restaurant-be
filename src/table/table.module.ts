import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Table } from './entities/table.entity'; // Adjust path as needed
import { Zone } from 'src/zone/entities/zone.entity'; // Adjust path as needed

@Module({
  imports: [TypeOrmModule.forFeature([Table, Zone])], // Add this line
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}