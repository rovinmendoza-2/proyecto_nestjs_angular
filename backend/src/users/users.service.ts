/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Observable, from, map, switchMap } from 'rxjs';
import { error } from 'console';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    console.log("data", data)
    return this.userRepository.save(data);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User> {
    const user =  this.userRepository.findOne({where: {id}});
    if(!user) {
      throw new Error('User not found')
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
    return user;
  }

  async updateUserProfileImage(email: string, data: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new Error('User not found');
    }
    console.log('data', data)
    user.profileImage = data
    return this.userRepository.save(user);
  }

  async updateOne(email: string, data: User): Promise<any> {
    const user = await this.userRepository.findOne({where: {email}});
    if(!user) {
      throw new Error('User not found');
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
}

  async findOneByNumber(number: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { number } });
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email } });
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
