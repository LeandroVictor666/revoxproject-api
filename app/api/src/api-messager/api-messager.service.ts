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

  dispatchInternalServerError(): ServerResponseDto {
    return {
      isError: true,
      response:
        'Internal Server Error, if this problem continues, contact a admin',
      responseFrom: 'server',
      responseStatus: ResponseStatus.InternalServerError,
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
