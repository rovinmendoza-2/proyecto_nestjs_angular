import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('/login')
  async loginUser(@Body() data: LoginUserDto) {
    return this.userService.loginUser(data);
  }
}
