import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',  // Cho phép tất cả các origin trong quá trình phát triển
    // Hoặc liệt kê cụ thể:
    // origin: ['http://localhost:3000', 'http://localhost:4200', 'https://restaurant-manager-chm11fic8-ltw-92af30ff.vercel.app', 'https://your-production-frontend.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Restaurant Table API')
    .setDescription('API quản lý bàn nhà hàng')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
