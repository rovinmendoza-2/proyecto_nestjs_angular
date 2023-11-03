/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser({ name, lastName, email, password, number }: RegisterDto) {
    console.log("auth",{name,lastName,email,password,number})
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const userWithSameNumber = await this.usersService.findOneByNumber(number);
    if (userWithSameNumber) {
      throw new BadRequestException('El número ya está en uso');
    }

    if (!name || !lastName || !email || !password || !number) {
      throw new BadRequestException('Todos los campos son requeridos');
    }

    if (typeof name !== 'string') {
      throw new BadRequestException('El nombre debe ser una cadena de texto');
    }

    if (typeof lastName !== 'string') {
      throw new BadRequestException('El apellido debe ser una cadena de texto');
    }

    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      !email.includes('.')
    ) {
      throw new BadRequestException('El correo electrónico no es válido');
    }

    if (typeof password !== 'string' || password.length < 8) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 8 caracteres',
      );
    }

    if (typeof number !== 'number') {
      throw new BadRequestException('El número debe ser un valor numérico');
    }

    //enviamos el usuario para guardarlo
    await this.usersService.createUser({
      name,
      lastName,
      email,
      number,
      password: await bcrypt.hash(password, 10),
    });

    return {
      name,
      email,
    }

  }
  

  async updateUser(email: string, user: string): Promise<User> {
    const userUpdate = await this.usersService.updateUserProfileImage(email, user);
    //console.log('userUpdate', userUpdate)
    return userUpdate;
  }
  

  async loginUser({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('El email es invalido');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('El password es invalido');
    }
    const payload = { email: user.email, role: user.role };
    console.log("payload", payload)
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
      message: `Bienvenido ${email} 🤗`
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    const user =  await this.usersService.findOneByEmail(email);
    // if(role !== 'user'){
    //   throw new UnauthorizedException('No tienes permisos')
    // }
    return user;
  }
}
