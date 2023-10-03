import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { RegisterDto } from './register.dto/register.dto';
import { Response } from 'express';
import { ResponseStatus } from 'src/enum/response-status.enum';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('example')
  exampleFunction(): ServerResponseDto {
    return this.registerService.exampleFunction();
  }
  @Post('register')
  async registerUser(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    try {
      const response: ServerResponseDto =
        await this.registerService.registerUser(registerDto);
      res.statusCode = HttpStatus.CREATED;
      res.send(response);
    } catch (error) {
      const responseObject = error as ServerResponseDto;
      if (responseObject.responseStatus == ResponseStatus.ClientInputError) {
        res.statusCode = HttpStatus.BAD_REQUEST;
        res.send(responseObject);
      } else {
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        res.send(responseObject);
      }
    }
  }
}
