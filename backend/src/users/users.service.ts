/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const { name, lastName, email, password, number } = data;

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

    // Genera un salt y utiliza bcrypt para hashear la contraseña
    const saltRounds = 10; // Número de rounds de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = this.userRepo.create({ ...data, password: hashedPassword });

    return this.userRepo.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(
        'El correo electronico o contrasenia son incorrectos',
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('La contrasenia es incorrecta');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
      expiresIn: '1h',
    });
    return { token };
  }
}
