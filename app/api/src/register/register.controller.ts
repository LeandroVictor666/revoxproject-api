import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { RegisterDto } from './register.dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('example')
  exampleFunction(): ServerResponseDto {
    return this.registerService.exampleFunction();
  }
  @Post('register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.registerService.registerUser(registerDto);
  }
}
