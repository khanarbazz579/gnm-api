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
import { AppPermissionsDto } from './app-permissions.dto';
import { AppPermissionsService } from './app-permissions.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('app-permissions')
export class AppPermissionsController { 
    constructor(private appPermissionsService: AppPermissionsService) {}

    @Post()
    async create(@Body(ValidationPipe) appPermissionsDto: AppPermissionsDto) {
        return this.appPermissionsService.create(appPermissionsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.appPermissionsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.appPermissionsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.appPermissionsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) appPermissionsDto: AppPermissionsDto,
    ) {
        return this.appPermissionsService.updateById(id, appPermissionsDto);
    }
}