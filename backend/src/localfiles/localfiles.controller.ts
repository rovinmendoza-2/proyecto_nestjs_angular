/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalfilesService } from './localfiles.service';
import { LocalFileDto } from './dto/localFile.dto';

@Controller('localfiles')
export class LocalfilesController {
    constructor(private readonly imageService: LocalfilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() localFileDto: LocalFileDto, @Param('productId') productId: number) {
    // Guardar la información de la imagen en la base de datos y relacionarla con el producto
    return this.imageService.uploadImage(localFileDto, productId);
  }

  @Get('images')
  async getImage() {
    const image = await this.imageService.getImage();
    return image;
  }
}
