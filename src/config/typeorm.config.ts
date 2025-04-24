import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'secret',
    database: 'restaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // Add this line
    synchronize: true, // Set to false in production

};
