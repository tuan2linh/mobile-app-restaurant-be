import { Test, TestingModule } from '@nestjs/testing';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Table } from '../table/entities/table.entity';

describe('ZoneController', () => {
  let controller: ZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoneController],
      providers: [
        ZoneService,
        {
          provide: getRepositoryToken(Zone),
          useValue: {}, // mock rỗng hoặc thêm hàm cần dùng
        },
        {
          provide: getRepositoryToken(Table),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ZoneController>(ZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
