import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from './database.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
