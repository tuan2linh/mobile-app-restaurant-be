import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê số bàn còn trống trong từng khu vực' })
  getZoneStatistics() {
    return this.zoneService.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo khu vực mới (Zone)' })
  @ApiBody({
    description: 'Thông tin khu vực',
    type: CreateZoneDto,
    examples: {
      example1: {
        summary: 'Tạo khu vực VIP',
        value: {
          name: 'Khu VIP',
        },
      },
    },
  })
  create(@Body() dto: CreateZoneDto) {
    return this.zoneService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả khu vực' })
  findAll() {
    return this.zoneService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết khu vực theo ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID của khu vực' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.zoneService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật tên khu vực' })
  @ApiParam({ name: 'id', example: 1, description: 'ID của khu vực cần cập nhật' })
  @ApiBody({
    description: 'Dữ liệu cập nhật',
    type: UpdateZoneDto,
    examples: {
      example1: {
        summary: 'Đổi tên thành Khu sân vườn',
        value: {
          name: 'Khu sân vườn',
        },
      },
    },
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateZoneDto) {
    return this.zoneService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá khu vực' })
  @ApiParam({ name: 'id', example: 2, description: 'ID khu vực cần xoá' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.zoneService.remove(+id);
  }

  @Get(':id/tables')
  @ApiOperation({ summary: 'Lấy danh sách bàn thuộc khu vực' })
  @ApiParam({ name: 'id', example: 1, description: 'ID khu vực' })
  getTables(@Param('id', ParseIntPipe) id: number) {
    return this.zoneService.getTablesInZone(id);
  }
}
