import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Table } from '../table/entities/table.entity';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepository;
  let tableRepository;

  beforeEach(async () => {
    const mockCustomerRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(dto => ({id: 1, ...dto})),
      find: jest.fn().mockResolvedValue([{id: 1, name: 'Test Customer'}]),
      findOne: jest.fn().mockResolvedValue({id: 1, name: 'Test Customer'}),
      remove: jest.fn().mockResolvedValue(true),
    };

    const mockTableRepository = {
      findOne: jest.fn().mockResolvedValue({id: 1, name: 'Test Table', isAvailable: true}),
      save: jest.fn().mockImplementation(table => Promise.resolve(table)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
        {
          provide: getRepositoryToken(Table),
          useValue: mockTableRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerRepository = module.get(getRepositoryToken(Customer));
    tableRepository = module.get(getRepositoryToken(Table));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});