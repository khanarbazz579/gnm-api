import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('categories')
export class CategoriesController { 
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    async create(@Body(ValidationPipe) categoriesDto: CategoriesDto) {
        return this.categoriesService.create(categoriesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.categoriesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.categoriesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) categoriesDto: CategoriesDto,
    ) {
        return this.categoriesService.updateById(id, categoriesDto);
    }
}