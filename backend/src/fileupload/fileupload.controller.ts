/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/fileupload.dto';
import { Response } from 'express';

@Controller('fileupload')
export class FileuploadController {

    constructor(
        private readonly fileuploadService:FileuploadService) {};

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file): Promise<FileDto> {
        return this.fileuploadService.createFile(file);
    };

    @Get(':filename')
    async getImagen(@Param('filename') filename: string, @Res() res: Response) {
        const image = await this.fileuploadService.getImageByName(filename);
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
        @UploadedFile() file) {
        await this.fileuploadService.updateFile(id, file);
        return {message: 'Se actualio correctamente'}
    }

}
