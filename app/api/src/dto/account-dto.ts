import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class AccountDto {
  @IsNumber()
  id: number;
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
