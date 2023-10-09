/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Post, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { ProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@UploadedFile() file, @Body() productDto: ProductDto) {
        console.log("productDto1", productDto);
        console.log("file1", file);
        const product = await this.productService.createProduct(productDto, file);
        
        return {product};
    };

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();
        console.log(products);
        return products;
    }

}
