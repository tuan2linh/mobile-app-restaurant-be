import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bàn mới' })
  @ApiBody({
    description: 'Thông tin bàn mới cần tạo',
    type: CreateTableDto,
    examples: {
      example1: {
        summary: 'Tạo bàn số 5 ở khu tầng 1',
        value: {
          name: 'Bàn 5',
          capacity: 4,
          zoneId: 1
        },
      },
    },
  })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bàn' })
  findAll() {
    return this.tableService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Lấy danh sách các bàn còn trống' })
  findAvailable() {
    return this.tableService.findAvailable();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết bàn theo ID' })
  @ApiParam({ name: 'id', example: 3, description: 'ID của bàn cần xem' })
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bàn' })
  @ApiParam({ name: 'id', example: 5, description: 'ID bàn cần cập nhật' })
  @ApiBody({
    description: 'Thông tin cần cập nhật cho bàn',
    type: UpdateTableDto,
    examples: {
      example1: {
        summary: 'Cập nhật tên và sức chứa',
        value: {
          name: 'Bàn VIP 1',
          capacity: 6,
          zoneId: 2
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá bàn theo ID' })
  @ApiParam({ name: 'id', example: 7, description: 'ID bàn cần xoá' })
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
