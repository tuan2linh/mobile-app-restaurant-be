import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'restaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.NODE_ENV !== 'production',
    ...(process.env.DB_HOST?.includes('azure.com') ? {
      ssl: {
        rejectUnauthorized: false
      },
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    } : {}),
    logging: process.env.NODE_ENV !== 'production',
    retryAttempts: 5,
    retryDelay: 3000
};
