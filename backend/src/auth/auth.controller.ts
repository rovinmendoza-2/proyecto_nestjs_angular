/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
//import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
// interface RequestWithUser extends Request {
//   user: {
//     email: string;
//     role: string;
//   };
// }

@Controller('api/auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  async LoginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  // @Get('profile')
  // @Auth(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // async profile(@Req() req: RequestWithUser) {
  //   const users = await this.authService.profile(req.user);
  //   console.log("users",users)
  //   return users;
  // }

  @Get('profile')
  @Auth(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async profile(@ActiveUser() user: UserActiveInterface) {
    const users = await this.authService.profile(user);
    console.log("users",users)
    return users;
  }
}
