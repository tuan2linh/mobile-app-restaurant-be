import { Test, TestingModule } from '@nestjs/testing';
import { ZoneService } from './zone.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Table } from '../table/entities/table.entity';

describe('ZoneService', () => {
  let service: ZoneService;

  beforeEach(async () => {
    const mockZoneRepo = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(dto => Promise.resolve({id: 1, ...dto})),
      find: jest.fn().mockResolvedValue([{id: 1, name: 'Test Zone', tables: []}]),
      findOne: jest.fn().mockResolvedValue({id: 1, name: 'Test Zone', tables: []}),
      remove: jest.fn().mockResolvedValue(true),
    };

    const mockTableRepo = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZoneService,
        {
          provide: getRepositoryToken(Zone),
          useValue: mockZoneRepo,
        },
        {
          provide: getRepositoryToken(Table),
          useValue: mockTableRepo,
        },
      ],
    }).compile();

    service = module.get<ZoneService>(ZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});