import { Injectable } from '@nestjs/common';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { RegisterDto } from './register.dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { Repository } from 'typeorm';
import * as BCrypt from 'bcrypt';
import * as RegisterRules from '../rules/register-rules';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly apiMessagerService: ApiMessagerService,
  ) {}

  exampleFunction(): ServerResponseDto {
    return {
      isError: false,
      response: 'builded sucessfully!',
      responseStatus: ResponseStatus.Success,
      responseFrom: `server`,
    };
  }

  private async usernameExists(
    username: string,
  ): Promise<ServerResponseDto | false> {
    const result = await this.accountRepository.findOneBy({
      username: username,
    });
    if (result !== null) {
      return Promise.reject(
        this.apiMessagerService.createErrorResponse(
          'This username has already be taken',
          ResponseStatus.ClientInputError,
        ),
      );
    }
    return Promise.resolve(false);
  }
  private async emailExists(email: string): Promise<ServerResponseDto | false> {
    const result = await this.accountRepository.findOneBy({
      email: email,
    });
    if (result !== null) {
      return Promise.reject(
        this.apiMessagerService.createErrorResponse(
          'This E-Mail has already be taken',
          ResponseStatus.ClientInputError,
        ),
      );
    }
    return Promise.resolve(false);
  }
  private async newUser(registerDto: RegisterDto): Promise<ServerResponseDto> {
    try {
      const actualDate = new Date();
      const salt = BCrypt.genSaltSync(RegisterRules.ENCRYPT_SALT_ROUNDS);
      const hashedPassword = BCrypt.hashSync(registerDto.password, salt);
      await this.accountRepository
        .insert({
          username: registerDto.username,
          nickname: registerDto.nickname,
          email: registerDto.email,
          password: hashedPassword,
          birthday: actualDate,
        })
        .catch(() => {
          return Promise.reject({
            isError: true,
            response:
              'An error occurred on the server, if the error persists, contact us.',
            responseFrom: 'server',
            responseStatus: ResponseStatus.InternalServerError,
          });
        });
      return Promise.resolve({
        isError: false,
        response: 'Successfully Registered',
        responseFrom: `server`,
        responseStatus: ResponseStatus.Success,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async registerUser(registerDto: RegisterDto): Promise<ServerResponseDto> {
    try {
      try {
        await this.usernameExists(registerDto.username);
        await this.emailExists(registerDto.email);
      } catch (error) {
        return Promise.reject(error);
      }
      const registerResult = await this.newUser(registerDto);
      return Promise.resolve(registerResult);
    } catch (error) {
      return Promise.reject(
        this.apiMessagerService.createErrorResponse(
          'Failed to register account, please, try again',
          ResponseStatus.InternalServerError,
        ),
      );
    }
  }
}
