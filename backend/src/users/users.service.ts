/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    console.log("data", data)
    return this.userRepo.save(data);
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
    return user;
  }

  async findOneByNumber(number: number): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { number } });
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
