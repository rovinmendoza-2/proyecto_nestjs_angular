/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
export class RegisterDto {
    @Transform(({ value}) => value.trim())
  @IsString()
  name: string;
  @Transform(({ value}) => value.trim())
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @Transform(({ value}) => value.trim())
  @MinLength(8)
  password: string;
  @Transform(({ value}) => value.trim())
  @IsNumber()
  number: number;
}