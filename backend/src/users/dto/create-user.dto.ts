/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
  @IsNumber()
  number: number;
}

export class LoginUserDto {
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string
}
