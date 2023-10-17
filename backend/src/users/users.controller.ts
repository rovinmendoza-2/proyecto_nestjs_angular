import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { Role } from 'src/common/enums/role.enum';

//@Auth(Role.USER)
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() data: CreateUserDto) {
    const user = this.userService.createUser(data);
    return { data: user };
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
