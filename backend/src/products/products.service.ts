/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/create-product.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ) {}
    
      async createProduct(productDto: ProductDto): Promise<Product> {
        console.log(productDto);
    
        // Primero, valida y obtén la categoría
        const category = await this.validateCategory(productDto.category);
    
        // Crea una instancia de Producto sin asignar imágenes
        const product = new Product();
        product.name = productDto.name;
        product.description = productDto.description;
        product.price = productDto.price;
        product.stock = productDto.stock;
        product.category = category;
        product.views = productDto.views;
    
        // Guarda el producto en la base de datos
        const savedProduct = await this.productRepository.save(product);
    
        console.log(savedProduct);
        return savedProduct;
      }

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
