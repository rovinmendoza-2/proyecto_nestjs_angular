/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/create-product.dto';
import { Category } from 'src/categories/entities/category.entity';
//import sharp from 'sharp';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
      ) {}
    
      async createProduct(productDto: ProductDto): Promise<Product> {
        console.log(productDto)
        const category = await this.validateCategory(productDto.category)
        const product = await this.productRepository.save({
          ...productDto,
          category: category
        });
        console.log(product);
        return product;
      };

      private async validateCategory(category: string) {
        const categoryEntity = await this.categoryRepository.findOneBy({ name: category });
      
        if (!categoryEntity) {
          throw new BadRequestException('category not found');
        }
      
        return categoryEntity;
      };

      async getProducts() {
        const products = await this.productRepository.find();
        return products;
      }
}
