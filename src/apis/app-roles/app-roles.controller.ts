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
import { AppRolesDto } from './app-roles.dto';
import { AppRolesService } from './app-roles.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('app-roles')
export class AppRolesController { 
    constructor(private appRolesService: AppRolesService) {}

    @Post()
    async create(@Body(ValidationPipe) appRolesDto: AppRolesDto) {
        return this.appRolesService.create(appRolesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.appRolesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.appRolesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.appRolesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) appRolesDto: AppRolesDto,
    ) {
        return this.appRolesService.updateById(id, appRolesDto);
    }
}