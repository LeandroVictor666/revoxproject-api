import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  IsDateString,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 50)
  readonly username: string;
  @IsString()
  readonly nickname: string;
  @IsEmail()
  readonly email: string;
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minNumbers: 3,
    minSymbols: 2,
    minUppercase: 1,
  })
  readonly password: string;
  @IsDateString()
  readonly birthday: Date;
}
