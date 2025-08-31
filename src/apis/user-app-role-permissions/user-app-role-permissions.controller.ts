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
import { UserAppRolePermissionsDto } from './user-app-role-permissions.dto';
import { UserAppRolePermissionsService } from './user-app-role-permissions.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('user-app-role-permissions')
export class UserAppRolePermissionsController { 
    constructor(private userAppRolePermissionsService: UserAppRolePermissionsService) {}

    @Post()
    async create(@Body(ValidationPipe) userAppRolePermissionsDto: UserAppRolePermissionsDto) {
        return this.userAppRolePermissionsService.create(userAppRolePermissionsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.userAppRolePermissionsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.userAppRolePermissionsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.userAppRolePermissionsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) userAppRolePermissionsDto: UserAppRolePermissionsDto,
    ) {
        return this.userAppRolePermissionsService.updateById(id, userAppRolePermissionsDto);
    }
}