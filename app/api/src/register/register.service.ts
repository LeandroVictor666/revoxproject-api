import { Injectable } from '@nestjs/common';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { RegisterDto } from './register.dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { Repository } from 'typeorm';
import * as BCrypt from 'bcrypt';
import * as RegisterRules from '../rules/register-rules';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  exampleFunction(): ServerResponseDto {
    return {
      isError: false,
      response: 'builded sucessfully!',
      responseStatus: ResponseStatus.Success,
      responseFrom: `server`,
    };
  }

  registerUser(registerDto: RegisterDto): ServerResponseDto {
    const actualDate = new Date();
    const salt = BCrypt.genSaltSync(RegisterRules.ENCRYPT_SALT_ROUNDS);
    const hashedPassword = BCrypt.hashSync(registerDto.password, salt);
    try {
      this.accountRepository.insert({
        username: registerDto.username,
        nickname: registerDto.nickname,
        email: registerDto.email,
        password: hashedPassword,
        birthday: actualDate,
      });
      return {
        isError: false,
        response: 'Successfully Registered',
        responseFrom: `server`,
        responseStatus: ResponseStatus.Success,
      };
    } catch (error) {
      return {
        isError: true,
        response: 'Failed to register account, please, try again.',
        responseFrom: 'server',
        responseStatus: ResponseStatus.InternalServerError,
      };
    }
  }
}
