import { Injectable } from '@nestjs/common';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';

@Injectable()
export class ApiMessagerService {
  createErrorResponse(
    message: string,
    status: ResponseStatus,
  ): ServerResponseDto {
    return {
      isError: true,
      response: message,
      responseFrom: `server`,
      responseStatus: status,
    };
  }

  createSuccessResponse(
    message: string,
    status: ResponseStatus,
  ): ServerResponseDto {
    return {
      isError: false,
      response: message,
      responseFrom: `server`,
      responseStatus: status,
    };
  }
}
