import { IsNumberString } from 'class-validator';

export default class PublicationsRequestDto {
  @IsNumberString()
  lastPublicationId: number;
}
