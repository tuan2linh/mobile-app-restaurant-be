import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Table } from '../table/entities/table.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Table])], // ❗ rất quan trọng
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
