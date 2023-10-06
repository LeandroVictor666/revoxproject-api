import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from 'src/dto/login-dto';
import { Request } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async loginUser(@Body() loginDto: LoginDto, @Req() req: Request) {
    try {
      const jwtToken = await this.authenticationService.loginUser(
        loginDto,
        req.ip,
      );
      return jwtToken;
    } catch (error) {
      return error;
    }
  }
}
