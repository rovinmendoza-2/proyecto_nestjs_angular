/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from './entities/fileupload.entity';
import { FileDto } from './dto/fileupload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class FileuploadService {
    
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
        ) {}

    async createFile(file, fileDto: FileDto): Promise<FileDto> {
        const productId = await this.getProductById(fileDto.productId);
        console.log("idd", productId)
        const image = new File();
        image.data = file.buffer;
        image.filename = file.originalname;
        image.mimetype = file.mimetype;
        image.size = file.size;
        image.productId = fileDto.productId;
        await this.fileRepository.save(image);
        return image;
    };

    async getImage(productId: number): Promise<File> {
        return this.fileRepository.findOne({where: { productId }});
    }

    private async getProductById(id: number) {
        const pruductId = await this.productRepository.findOneBy({id});
        console.log("id", pruductId.id);
        return (pruductId.id);
    }

    
}
