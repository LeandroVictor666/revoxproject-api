import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { RevoxdbModule } from './revoxdb/revoxdb.module';
import { DataSource } from 'typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { RedisModule } from '@songkeys/nestjs-redis';
import { exec } from 'child_process';
const redisCommand = 'redis-server';
exec(redisCommand);
@Module({
  imports: [
    RegisterModule,
    RevoxdbModule,
    AuthenticationModule,
    RedisModule.forRoot({
      config: { host: 'localhost', port: 6379 },
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
