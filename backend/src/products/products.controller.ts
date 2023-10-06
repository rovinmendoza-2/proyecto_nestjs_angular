/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    @UseInterceptors(FileInterceptor('images'))
    async createProduct(@Body() productDto: ProductDto, @UploadedFile() file: Express.Multer.File) {
        const image = file.originalname;
        productDto.images = image;
        console.log(productDto.images);
        const product = await this.productService.createProduct(productDto);
        console.log(product);
        return product;
    };

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

}
