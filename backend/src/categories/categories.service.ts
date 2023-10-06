/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/create-category';

@Injectable()
export class CategoriesService {
    
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async createCategory(categoryDto: CategoryDto): Promise<Category> {
        const category = new Category();
        category.name = categoryDto.name;
        return await this.categoryRepository.save(category);

    }
}
