import { Controller, Get } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('example')
  exampleFunction(): string {
    return this.registerService.exampleFunction();
  }
}
