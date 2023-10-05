import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AccountService } from 'src/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { jwtConstants } from './auth-constants';
import { AuthenticationController } from './authentication.controller';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '25 days' },
    }),
  ],
  providers: [AuthenticationService, AccountService, ApiMessagerService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
