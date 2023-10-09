import { IsString, Length } from 'class-validator';

export default class NewPublicationDto {
  @Length(3, 6000)
  @IsString()
  content: string;
}
