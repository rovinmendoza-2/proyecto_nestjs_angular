/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import LocalFile from './entities/localFile.entity';
import { Repository } from 'typeorm';
import { LocalFileDto } from './dto/localFile.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class LocalfilesService {
  constructor(
    @InjectRepository(LocalFile)
    private readonly imageRepository: Repository<LocalFile>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async uploadImage(localFileDto: LocalFileDto, productId: number) {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    const image = new LocalFile();
    image.filename = localFileDto.filename;
    image.product = product;

    return await this.imageRepository.save(image);
  };

  async getImage() {
    const image = await this.imageRepository.find();
    return image;
  }
}
