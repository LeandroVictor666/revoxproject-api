import { Module } from '@nestjs/common';
import { PublicationInterceptor } from './publication.interceptor';
import { Publications } from 'src/database/entity/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { RedismanagerService } from 'src/redismanager/redismanager.service';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publications])],
  providers: [
    PublicationService,
    PublicationInterceptor,
    RedismanagerService,
    AuthenticationGuard,
    ApiMessagerService,
  ],
  controllers: [PublicationController],
})
export class PublicationModule {}
