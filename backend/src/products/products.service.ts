/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { ProductDto } from './dto/create-product.dto';
import { Category } from 'src/categories/entities/category.entity';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ) {}
    
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async createProduct(productDto: ProductDto): Promise<Product> {
        console.log("productDto2", productDto.name);

        this.validateProduct(productDto);

        const productExist = await this.productRepository.findOne({where: {name: productDto.name}})
        if(productExist) {
          throw new BadRequestException('El producto con ese nombre ya existe.');
        }
        // Primero, valida y obtén la categoría
        const category = await this.validateCategory(productDto.category);
        const urlImagen = `http://localhost:3000/fileupload/${productDto.image}`
        // Crea una instancia de Producto sin asignar imágenes
        const product = new Product();
        product.name = productDto.name;
        product.image = urlImagen
        product.description = productDto.description;
        product.price = productDto.price;
        product.stock = productDto.stock;
        product.category = category;
        product.views = productDto.views;
    
        // Guarda el producto en la base de datos
        const savedProduct = await this.productRepository.save(product);

        // // Genera la URL dinámica utilizando el ID del producto
        // savedProduct.image = `http://localhost:3000/fileupload/${savedProduct.id}`;

        // // Actualiza el producto con la URL generada
        // await this.productRepository.save(savedProduct);
    
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

      private async validateProduct(productDto: ProductDto) {
        if (productDto.name === '') {
          throw new BadRequestException('Debe proporcionar un nombre');
        } else if (/^\d+$/.test(productDto.name)) {
          throw new BadRequestException('El nombre no puede ser una cadena de números');
        }
      
        if (productDto.description === '') {
          throw new BadRequestException('Debe proporcionar una descripción');
        } else if (/^\d+$/.test(productDto.description)) {
          throw new BadRequestException('La descripción no puede ser una cadena de números');
        }
      
        if (isNaN(productDto.price)) {
          throw new BadRequestException('El precio debe ser un número válido');
        } else if (productDto.price <= 0) {
          throw new BadRequestException('El precio debe ser mayor que cero');
        }
      }

    //   private async validateImage(filename: string) {
    //     const productImage = this.fileRepository.findOneBy({name: filename});
    //     return productImage
    // }

      async getProducts() {
        const products = await this.productRepository.find();
        return products;
      }

      async getProductById(id:number): Promise<Product>{
        const product = await this.productRepository.findOneBy({id});
        if(!product) {
          throw new NotFoundException('Producto no encontrado');
        }
        // Incrementa el contador de vistas
        product.views += 1;

        // Guarda el producto actualizado en la base de datos
        await this.productRepository.save(product);
        return product
    }

}
