import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TableModule } from './table/table.module';
import { ZoneModule } from './zone/zone.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomerModule,
    TableModule,
    ZoneModule,
  ],
})
export class AppModule {}
