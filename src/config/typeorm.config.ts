import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  // Nếu có chuỗi kết nối URL, dùng nó
  ...(process.env.DATABASE_URL ? {
    url: process.env.DATABASE_URL,
    type: 'mysql',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.NODE_ENV !== 'production',
    ssl: {
      rejectUnauthorized: false
    },
    logging: process.env.NODE_ENV !== 'production',
    retryAttempts: 5,
    retryDelay: 3000
  } : {
    // Cấu hình cũ nếu không có DATABASE_URL
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'restaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.NODE_ENV !== 'production',
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : undefined
  })
};
