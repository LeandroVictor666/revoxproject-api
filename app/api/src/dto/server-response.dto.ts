import { ResponseStatus } from 'src/enum/response-status.enum';

export class ServerResponseDto {
  response: string;
  isError: boolean;
  responseStatus: ResponseStatus;
  responseFrom: 'server';
}
