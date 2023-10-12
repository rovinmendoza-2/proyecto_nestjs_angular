/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from './entities/fileupload.entity';
import { FileDto } from './dto/fileupload.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileuploadService {

    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>
    ) { }

    async createFile(file): Promise<FileDto> {
        await this.validateImgan(file.originalname);
        const image = new File();
        image.data = file.buffer;
        image.filename = file.originalname;
        image.mimetype = file.mimetype;
        image.size = file.size;
        await this.fileRepository.save(image);
        return image;
    };

    async getImageByName(filename: string): Promise<File> {
        const productImage = this.fileRepository.findOne({ where: { filename } });
        return productImage
    }

    private async validateImgan(filename: string) {
        const existingFile = await this.fileRepository.findOne({
            where: { filename },
        });

        if (existingFile) {
            throw new ConflictException('Esa imagen ya le pertenece a otro producto');
        }
    }

    async updateFile(id: number, file) {
        const fileUpdate = await this.fileRepository.findOne({ where: { id } });
        if (!fileUpdate) {
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

        await this.fileRepository.save(fileUpdate);
        return fileUpdate;
    }

}
