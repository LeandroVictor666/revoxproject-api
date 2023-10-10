import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { LoginDto } from 'src/dto/login-dto';
import * as BCrypt from 'bcrypt';
import { AccountDto } from 'src/dto/account-dto';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
import { RedismanagerService } from 'src/redismanager/redismanager.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
    private readonly apiMessagerService: ApiMessagerService,
    private readonly redisManager: RedismanagerService,
  ) {}
  private dispatchInvalidCredentialsMessage() {
    return this.apiMessagerService.createErrorResponse(
      'Invalid Credentials, please, try again',
      ResponseStatus.ClientInputError,
    );
  }
  private dispatchSuccessLoginWithJwt(jwtToken: string) {
    return this.apiMessagerService.createSuccessResponse(
      jwtToken,
      ResponseStatus.Success,
    );
  }
  async loginUser(
    loginObject: LoginDto,
    clientIpAddress,
  ): Promise<ServerResponseDto> {
    try {
      const searchResult = await this.accountService.getPassword(
        loginObject.username,
      );
      if (searchResult === false) {
        return Promise.reject(this.dispatchInvalidCredentialsMessage());
      }
      const compareResult = await BCrypt.compare(
        loginObject.password,
        searchResult,
      );
      if (compareResult === false) {
        return Promise.reject(this.dispatchInvalidCredentialsMessage());
      }
      const accountDataQuery =
        await this.accountService.getSecureAccountDataByUsername(
          loginObject.username,
        );
      if (accountDataQuery === false) {
        return Promise.reject(this.dispatchInvalidCredentialsMessage());
      }
      const accountData: AccountDto = new AccountDto();
      accountData.id = accountDataQuery.id;
      accountData.username = loginObject.username;
      accountData.nickname = accountDataQuery.nickname;
      accountData.email = accountDataQuery.email;
      accountData.isPfpSet = accountDataQuery.isPfpSet;
      accountData.birthday = accountDataQuery.birthday;
      const payload = {
        accountData,
        originIp: clientIpAddress,
      };
      const jwtToken = await this.jwtService.signAsync(payload);
      // redisClient.set(jwtToken, 'valid');
      this.redisManager.setKey(jwtToken, 'valid');
      return Promise.resolve(this.dispatchSuccessLoginWithJwt(jwtToken));
    } catch (error) {
      return Promise.reject(
        this.apiMessagerService.dispatchInternalServerError(),
      );
    }
  }
  async revokeJwtToken(jwtToken: string) {
    return await this.redisManager.setKey(jwtToken, 'invalid');
  }
}
