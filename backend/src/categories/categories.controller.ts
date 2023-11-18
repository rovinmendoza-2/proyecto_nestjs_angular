/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
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

    @Get()
    async getCategories() {
        const categories = await this.categoryService.getCategories();
        console.log(categories);
        return categories;
    }
}
