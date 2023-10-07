import { IsBoolean, IsDateString, IsEmail, IsString } from 'class-validator';

export class AccountDto {
  @IsString()
  username: string;
  @IsString()
  nickname: string;
  @IsEmail()
  email: string;
  @IsBoolean()
  isPfpSet: boolean;
  @IsDateString()
  birthday: Date;
}
