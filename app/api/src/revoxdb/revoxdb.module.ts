import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { Publications } from 'src/database/entity/publication.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'revox',
      password: 'changeme',
      database: 'revox',
      entities: [Account, Publications],
      synchronize: true,
    }),
  ],
})
export class RevoxdbModule {}
