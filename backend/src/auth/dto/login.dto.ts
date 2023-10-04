/* eslint-disable prettier/prettier */
import { IsEmail, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginDto {
  @IsEmail()
  email: string;
  @Transform(({ value}) => value.trim())
  @MinLength(8)
  password: string;
}