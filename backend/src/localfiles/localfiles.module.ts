/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LocalfilesController } from './localfiles.controller';
import { LocalfilesService } from './localfiles.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './entities/localFile.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalFile]),
    ProductsModule,
    CategoriesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Directorio donde se guardarán las imágenes
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [LocalfilesController],
  providers: [LocalfilesService, ProductsService, CategoriesService],
  exports: [TypeOrmModule],
})
export class LocalfilesModule {}
