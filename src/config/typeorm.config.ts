import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'restaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // Add this line
    synchronize: true, // Set to false in production
    ssl: {
        // Enable SSL for secure connection
        rejectUnauthorized: true,
    },
    extra: {
        ssl: {
            rejectUnauthorized: false // This might be needed for Azure MySQL
        }
    }
};
