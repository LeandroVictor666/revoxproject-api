import { Test, TestingModule } from '@nestjs/testing';
import { RedismanagerService } from './redismanager.service';

describe('RedismanagerService', () => {
  let service: RedismanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedismanagerService],
    }).compile();

    service = module.get<RedismanagerService>(RedismanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
