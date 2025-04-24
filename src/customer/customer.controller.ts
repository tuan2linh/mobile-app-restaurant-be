import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo khách hàng và gán bàn' })
  @ApiBody({
    description: 'Thông tin khách hàng và ID bàn muốn đặt',
    type: CreateCustomerDto,
    examples: {
      example1: {
        summary: 'Khách Nguyễn Văn A đặt bàn số 3',
        value: {
          name: 'Nguyễn Văn A',
          phone: '0912345678',
          tableId: 3
        }
      }
    }
  })
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả khách hàng' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết khách hàng' })
  @ApiParam({ name: 'id', example: 1, description: 'ID của khách hàng' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin khách hàng' })
  @ApiParam({ name: 'id', example: 2, description: 'ID của khách hàng cần cập nhật' })
  @ApiBody({
    description: 'Thông tin muốn cập nhật',
    type: UpdateCustomerDto,
    examples: {
      example1: {
        summary: 'Đổi tên và số điện thoại',
        value: {
          name: 'Nguyễn Văn B',
          phone: '0987654321',
          tableId: 4
        }
      }
    }
  })
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customerService.update(+id, dto);
  }

  @Patch(':id/assign-table')
  @ApiOperation({ summary: 'Gán bàn cho khách đã tồn tại' })
  @ApiParam({ name: 'id', example: 4, description: 'ID của khách cần gán bàn' })
  @ApiBody({
    description: 'ID bàn muốn gán',
    schema: {
      type: 'object',
      properties: {
        tableId: {
          type: 'number',
          example: 2,
        },
      },
    },
  })
  async assignTable(
    @Param('id') id: number,
    @Body('tableId') tableId: number,
  ) {
    return this.customerService.assignTable(+id, tableId);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Xoá khách hàng và trả bàn nếu có' })
  @ApiParam({ name: 'id', example: 5, description: 'ID của khách hàng cần xoá' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Patch(':id/leave')
  @ApiOperation({ summary: 'Khách hàng trả bàn (rời khỏi bàn)' })
  @ApiParam({ name: 'id', example: 3, description: 'ID của khách muốn trả bàn' })
  leaveTable(@Param('id') id: string) {
    return this.customerService.leaveTable(+id);
  }
}
