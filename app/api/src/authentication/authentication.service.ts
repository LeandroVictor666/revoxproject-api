import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { LoginDto } from 'src/dto/login-dto';
import * as BCrypt from 'bcrypt';
import { AccountDto } from 'src/dto/account-dto';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
    private readonly apiMessagerService: ApiMessagerService,
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
  async loginUser(loginObject: LoginDto): Promise<ServerResponseDto> {
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
      const accountData =
        await this.accountService.getSecureAccountDataByUsername(
          loginObject.username,
        );
      if (accountData === false) {
        return Promise.reject(this.dispatchInvalidCredentialsMessage());
      }
      const accountObjectFormated: AccountDto = new AccountDto();
      accountObjectFormated.username = loginObject.username;
      accountObjectFormated.nickname = accountData.nickname;
      accountObjectFormated.email = accountData.email;
      accountObjectFormated.birthday = accountData.birthday;
      const payload = {
        accountObjectFormated,
      };
      const jwtToken = await this.jwtService.signAsync(payload);
      return Promise.resolve(this.dispatchSuccessLoginWithJwt(jwtToken));
    } catch (error) {
      return Promise.reject(
        this.apiMessagerService.dispatchInternalServerError(),
      );
    }
  }
}
