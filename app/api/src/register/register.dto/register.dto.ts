import {
  IsDateString,
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @Length(3, 50)
  @IsString()
  readonly username: any;
  @IsString()
  readonly nickname: string;
  @IsEmail()
  readonly email: string;
  @IsStrongPassword({
    minLength: 4,
    minSymbols: 0,
    minUppercase: 1,
    minNumbers: 3,
  })
  readonly password: string;
  @IsDateString()
  readonly birthday: Date;
}
