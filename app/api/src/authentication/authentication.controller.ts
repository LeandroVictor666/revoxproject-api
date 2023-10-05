import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from 'src/dto/login-dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      const jwtToken = await this.authenticationService.loginUser(loginDto);
      return jwtToken;
    } catch (error) {
      return error;
    }
  }
}
