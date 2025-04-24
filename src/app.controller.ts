import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TableModule } from './table/table.module';
import { ZoneModule } from './zone/zone.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TableModule,
    ZoneModule,
  ],
})
export class AppModule {}
