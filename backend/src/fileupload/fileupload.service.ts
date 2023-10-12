/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
        
        const existProductId = await this.fileRepository.findOne({where: {productId}});
        if(existProductId) {
            throw new ConflictException('Ese producto ya tiene una imagen')
        }
        await this.validateImgan(file.originalname);

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
        const productImage = this.fileRepository.findOne({where: { productId }});
        return productImage
    }

    private async getProductById(id: number) {
        const pruductId = await this.productRepository.findOneBy({id});
        if(!pruductId) {
            throw new BadRequestException('No existe un producto con ese ID')
        }
        return (pruductId.id);
    }

    private async validateImgan(filename: string) {
        
        const existingFile = await this.fileRepository.findOne({
            where: { filename },
        });

        if (existingFile) {
            throw new ConflictException('Esa imagen ya le pertenece a otro producto');
        }
    }

    async updateFile(id: number, fileDto: FileDto, file) {
        const fileUpdate = await this.fileRepository.findOne({where: {id}});
        if(!fileUpdate) {
            throw new NotFoundException(`File with ID ${id} not found`)
        }
        // Verifica si el filename ya existe en otro archivo
        const existingFile = await this.fileRepository.findOne({
            where: { filename: file.originalname },
        });

        if (existingFile && existingFile.id !== id) {
            throw new ConflictException('Esa imagen ya existe');
        }
        
        fileUpdate.data = file.buffer;
        fileUpdate.filename = file.originalname;
        fileUpdate.mimetype = file.mimetype;
        fileUpdate.size = file.size;
        fileUpdate.productId = fileDto.productId

        await this.fileRepository.save(fileUpdate);
        return fileUpdate;
    }

    
}
