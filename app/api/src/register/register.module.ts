import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [RegisterController],
  providers: [RegisterService, ApiMessagerService],
})
export class RegisterModule {}
