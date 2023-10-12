/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/fileupload.dto';
import { Response } from 'express';
import { ProductsService } from 'src/products/products.service';
//import { join } from 'path';
//import * as fs from 'fs';
//import * as path from 'path';

@Controller('fileupload')
export class FileuploadController {

    constructor(
        private readonly fileuploadService:FileuploadService,
        private readonly productService: ProductsService) {};

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file, @Body() fileDto: FileDto): Promise<FileDto> {
        return this.fileuploadService.createFile(file, fileDto);
    };

    @Get(':id')
    async getImagen(@Param('id') id: number, @Res() res: Response) {
        const image = await this.fileuploadService.getImage(id);
        if(!image && image.filename === 'default.jpg') {
            res.send(image.data);
        }
        console.log("image", image.filename)
        res.set('Content-Type', image.mimetype);
        res.send(image.data);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(

        @Param('id') id: number,
        @Body() fileDto: FileDto,
        @UploadedFile() file) {
        await this.fileuploadService.updateFile(id, fileDto, file);
        return {message: 'Se actualio correctamente'}
    }
}
