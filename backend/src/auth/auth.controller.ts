/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, UseGuards, UseInterceptors, UploadedFile, Request, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
//import { v4 as uuidv4 } from 'uuid';
// interface RequestWithUser extends Request {
//   user: {
//     email: string;
//     role: string;
//   };
// }

export const storage = {
  storage: diskStorage({
    destination: './uploads/profile/',
    filename: (req, file, cb) => {
      console.log(file);
      const filename = file.originalname
      console.log('filename', filename);
      cb(null, `${filename}`);
    }
  })
}
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

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadProfile(@UploadedFile() file, @Request() req) {
    const user = req.user;
    //console.log('file',file);
    const profileImage = file.originalname;
    console.log('profileImage', profileImage)
    const updatedUser = await this.authService.updateUser(user.email, profileImage);
    console.log('updatedUser', updatedUser);
    return { profileImage: updatedUser.profileImage };
  }

  // @Get('profile')
  // @Auth(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // async profile(@Req() req: RequestWithUser) {
  //   const users = await this.authService.profile(req.user);
  //   console.log("users",users)
  //   return users;
  // }

  @Put(':email')
    updateUser(@Param('email') email: string, @Body() user: string) {
        return this.authService.updateUser(String(email), user);
    }

  @Get('profile')
  @Auth(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async profile(@ActiveUser() user: UserActiveInterface) {
    const users = await this.authService.profile(user);
    console.log("users",users)
    return users;
  }

  @Get('profile-image/:imagename')
  async getImagen(@Param('imagename') imagename, @Res() res){
    return res.sendFile(join(process.cwd(), 'uploads/profile/'+imagename));
  }
}


