<p align="center">
  <h1 align="center">Restaurant Manager API</h1>
  <p align="center">
    REST API quản lý bàn và khu vực nhà hàng với NestJS
    <br/>
    <a href="https://github.com/tuan2linh/mobile-app-restaurant-be/releases">
      <img src="https://img.shields.io/github/package-json/v/tuan2linh/mobile-app-restaurant-be" alt="Version">
    </a>
    <br/>
    <a href="https://restaurantbe.azurewebsites.net/api">API Documentation Demo</a>
  </p>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Công nghệ sử dụng

### Backend Framework & Core
- NestJS 11.0 - Framework Node.js xây dựng trên Express
- TypeScript - Ngôn ngữ lập trình với type checking
- TypeORM - ORM cho TypeScript và JavaScript
- MySQL - Hệ quản trị cơ sở dữ liệu

### Development & Testing
- Jest - Framework testing
- Docker & Docker Compose - Container hóa ứng dụng
- ESLint & Prettier - Code formatting và linting
- Swagger/OpenAPI - API documentation

### Deployment & CI/CD  
- GitHub Actions - CI/CD pipeline
- Azure Web Apps - Cloud hosting platform

## Cài đặt và Chạy ứng dụng

### 1. Cài đặt dependencies
```bash
$ npm install
```

### 2. Cấu hình Database

#### Sử dụng Docker (Recommended)
```bash
# Khởi chạy MySQL container
$ docker-compose up -d

# Kiểm tra container đang chạy
$ docker ps
```

#### Cấu hình env cho Docker
Tạo file .env với nội dung:
```env
DB_HOST=localhost
DB_PORT=3307
DB_USERNAME=root  
DB_PASSWORD=secret
DB_NAME=restaurant
```

#### Sử dụng MySQL có sẵn
Nếu bạn đã có MySQL server, chỉnh sửa thông tin kết nối trong file .env tương ứng.

### 3. Chạy ứng dụng

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run build
$ npm run start:prod
```

## API Documentation

Sau khi khởi chạy, truy cập Swagger UI để xem tài liệu API:

### Development
```
http://localhost:8080/api
```

### Production
```
https://restaurantbe.azurewebsites.net/api
```

### Các nhóm API chính:

1. Zones (/zone)
- CRUD khu vực
- Xem danh sách bàn trong khu vực
- Thống kê bàn trống theo khu vực

2. Tables (/table)  
- CRUD bàn
- Xem danh sách bàn trống
- Gán/hủy gán bàn cho khách

3. Customers (/customer)
- CRUD khách hàng
- Đặt bàn cho khách
- Khách trả bàn

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests 
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE)
