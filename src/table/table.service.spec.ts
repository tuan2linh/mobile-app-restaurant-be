import { Test, TestingModule } from '@nestjs/testing';
import { TableService } from './table.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Zone } from '../zone/entities/zone.entity';
import { NotFoundException } from '@nestjs/common';

describe('TableService', () => {
  let service: TableService;
  let tableRepository;
  let zoneRepository;

  // Mock data
  const mockTable = {
    id: 1,
    name: 'Test Table',
    capacity: 4,
    isAvailable: true
  };

  beforeEach(async () => {
    // Create mock repositories
    const mockTableRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(table => Promise.resolve({...table, id: 1})),
      find: jest.fn().mockResolvedValue([mockTable]),
      findOne: jest.fn().mockImplementation(({where}) => {
        if (where.id === 1) return Promise.resolve(mockTable);
        return Promise.resolve(null);
      }),
      remove: jest.fn().mockResolvedValue(true),
    };

    const mockZoneRepository = {
      findOne: jest.fn().mockImplementation(({where}) => {
        if (where.id === 1) return Promise.resolve({id: 1, name: 'Test Zone'});
        return Promise.resolve(null);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TableService,
        {
          provide: getRepositoryToken(Table),
          useValue: mockTableRepository,
        },
        {
          provide: getRepositoryToken(Zone),
          useValue: mockZoneRepository,
        },
      ],
    }).compile();

    service = module.get<TableService>(TableService);
    tableRepository = module.get(getRepositoryToken(Table));
    zoneRepository = module.get(getRepositoryToken(Zone));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tables', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockTable]);
      expect(tableRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a table if it exists', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockTable);
    });

    it('should throw NotFoundException if table does not exist', async () => {
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });
});