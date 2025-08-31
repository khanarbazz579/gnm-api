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
import { AppRolePermissionsDto } from './app-role-permissions.dto';
import { AppRolePermissionsService } from './app-role-permissions.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('app-role-permissions')
export class AppRolePermissionsController { 
    constructor(private appRolePermissionsService: AppRolePermissionsService) {}

    @Post()
    async create(@Body(ValidationPipe) appRolePermissionsDto: AppRolePermissionsDto) {
        return this.appRolePermissionsService.create(appRolePermissionsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.appRolePermissionsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.appRolePermissionsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.appRolePermissionsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) appRolePermissionsDto: AppRolePermissionsDto,
    ) {
        return this.appRolePermissionsService.updateById(id, appRolePermissionsDto);
    }
}