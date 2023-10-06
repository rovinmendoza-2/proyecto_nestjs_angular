/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/create-category';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoriesService) {}

    @Post('create')
    async createCategory(@Body() createDto: CategoryDto) {
        const category = await this.categoryService.createCategory(createDto);
        return category;
    }
}
