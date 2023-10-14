/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { CategoriesService } from '../categories/categories.service';
import { Product } from './entities/product.entity';
import { FileuploadService } from 'src/fileupload/fileupload.service';
import { FileuploadModule } from 'src/fileupload/fileupload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, FileuploadModule],
  providers: [ProductsService, CategoriesService, FileuploadService],
  controllers: [ProductsController],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
