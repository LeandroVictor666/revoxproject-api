import { Controller, Get } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ServerResponseDto } from 'src/dto/server-response.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('example')
  exampleFunction(): ServerResponseDto {
    return this.registerService.exampleFunction();
  }
}
