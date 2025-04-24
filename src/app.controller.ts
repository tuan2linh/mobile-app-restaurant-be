import { Module } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TableModule } from './table/table.module';
import { ZoneModule } from './zone/zone.module';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TableModule,
    ZoneModule,
  ],
})
export class AppModule {}
