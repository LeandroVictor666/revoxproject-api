import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
