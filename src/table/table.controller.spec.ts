import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Zone } from '../zone/entities/zone.entity';

describe('TableController', () => {
  let controller: TableController;
  let service: TableService;

  beforeEach(async () => {
    const mockTableRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const mockZoneRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableController],
      providers: [
        TableService,
        {
          provide: getRepositoryToken(Table),
          useValue: mockTableRepo,
        },
        {
          provide: getRepositoryToken(Zone),
          useValue: mockZoneRepo,
        },
      ],
    }).compile();

    controller = module.get<TableController>(TableController);
    service = module.get<TableService>(TableService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});