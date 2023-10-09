/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { File } from './entities/fileupload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]),
  ProductsModule,
  CategoriesModule],
  controllers: [FileuploadController],
  providers: [FileuploadService, ProductsService],
  exports: [TypeOrmModule],
})
export class FileuploadModule {}
