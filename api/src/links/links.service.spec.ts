import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { LinksRepository } from './links.repository';

describe('LinksService', () => {
  let service: LinksService;
  let repository: LinksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: LinksRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    repository = module.get<LinksRepository>(LinksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
