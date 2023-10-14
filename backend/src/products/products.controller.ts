/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Patch, Post, UseInterceptors} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { ProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@Body() productDto: ProductDto) {
        try {
            console.log("productDto1", productDto);
            await this.productService.createProduct(productDto);
            return {message: 'producto creado con exito!'};
        } catch (error) {
            return {message: 'Ocurrio un error', error}
        }
        
    };

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
            return {message: 'se actualizo con exito!'};
        } catch (error) {
            return {message: 'Ocurrio un error', error};
        }
        
    }

}
