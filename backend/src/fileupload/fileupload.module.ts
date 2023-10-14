/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { File } from './entities/fileupload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileuploadController],
  providers: [FileuploadService],
  exports: [TypeOrmModule],
})
export class FileuploadModule {}
