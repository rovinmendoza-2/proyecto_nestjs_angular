/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { ProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/create-product.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('imagen'))
    async createProduct(@Body() productData: ProductDto, @UploadedFile() imagen: Express.Multer.File,) {
        try {
            await this.productService.createProduct(productData, imagen);
            return { message: 'producto creado con exito!' };
        } catch (error) {
            return { message: 'Ocurrio un error', error }
        }
    }

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();
        console.log(products);
        return products;
    }

    @Get(':id')
    async getProductId(@Param('id') id: number) {
        const product = await this.productService.getProductById(id);
        return product;
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body() productDto: ProductDto) {
        try {
            await this.productService.updateProduct(id, productDto);
            return { message: 'se actualizo con exito!' };
        } catch (error) {
            return { message: 'Ocurrio un error', error };
        }

    };

    @Get('imagen/:filename')
    getImage(@Param('filename') filename: string, @Res() res: Response) {
        const imagePath = path.join(__dirname, '..', 'uploads', filename);

        // Verificar si el archivo existe antes de intentar enviarlo
        if (fs.existsSync(imagePath)) {
            // Configurar los encabezados de respuesta para la imagen
            res.header('Content-Type', 'image/png');

            // Enviar el archivo como respuesta
            fs.createReadStream(imagePath).pipe(res);
        } else {
            // Manejar la situación en la que el archivo no existe
            res.status(404).send('Image not found');
        }
    }

}
