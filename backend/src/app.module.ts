/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './users/database.module';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CatsModule,
    BreedsModule,
    ProductsModule,
    CategoriesModule,
    FileuploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
