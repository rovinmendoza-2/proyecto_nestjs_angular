/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    async createProduct(@Body() productDto: ProductDto) {
        const product = await this.productService.createProduct(productDto);
        console.log(product);
        return product;
    };

    @Get()
    async getProducts() {
        const products = await this.productService.getProducts();
        console.log(products);
        return products;
    }

}
