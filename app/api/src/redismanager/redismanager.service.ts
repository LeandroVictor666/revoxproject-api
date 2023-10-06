import { Injectable } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedismanagerService {
  redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }
  async getKey(keyName: string) {
    return await this.redisClient.get(keyName);
  }
  async setKey(keyName: string, value: string | number | Buffer) {
    return await this.redisClient.set(keyName, value);
  }
  async deleteKey(keyName: string) {
    return await this.redisClient.del(keyName);
  }
}
