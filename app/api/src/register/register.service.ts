import { Injectable } from '@nestjs/common';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';

@Injectable()
export class RegisterService {
  exampleFunction(): ServerResponseDto {
    return {
      isError: false,
      response: 'builded sucessfully!',
      responseStatus: ResponseStatus.Success,
      responseFrom: `server`,
    };
  }
}
