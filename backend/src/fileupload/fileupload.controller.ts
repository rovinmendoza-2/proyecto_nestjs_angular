/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/fileupload.dto';
import { Response } from 'express';
import { ProductsService } from 'src/products/products.service';

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
        console.log("image", image)
        res.set('Content-Type', image.mimetype);
        res.send(image.data);
    }

    @Get('product/:id')
    async getProductById(@Param('id') id: number) {
        const product = await this.productService.getProductById(id);
        console.log(product.id);
        return product.id
    }
}
