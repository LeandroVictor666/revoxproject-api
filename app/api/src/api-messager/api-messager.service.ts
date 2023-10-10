import { Injectable } from '@nestjs/common';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import PostgreSqlErrorsEnum from 'src/enum/postgre-sql-errors.enum';
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

  dispatchPostreSQLError(
    errorCode: PostgreSqlErrorsEnum | number,
    customMessage?: string,
  ): ServerResponseDto {
    switch (errorCode) {
      case PostgreSqlErrorsEnum.CANNOTBENULL: {
        if (customMessage === undefined) {
          customMessage = 'Please fill in all fields correctly.';
        }
        return this.createErrorResponse(
          customMessage,
          ResponseStatus.ClientInputError,
        );
      }
      default: {
        return this.dispatchInternalServerError();
      }
    }
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
