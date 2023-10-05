import { IsString, Length } from 'class-validator';

export class LoginDto {
  @Length(3, 80)
  @IsString()
  username: string;
  @Length(4, 255)
  @IsString()
  password: string;
}
