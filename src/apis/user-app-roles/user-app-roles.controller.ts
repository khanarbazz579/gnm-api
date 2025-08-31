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
import { UserAppRolesDto } from './user-app-roles.dto';
import { UserAppRolesService } from './user-app-roles.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('user-app-roles')
export class UserAppRolesController { 
    constructor(private userAppRolesService: UserAppRolesService) {}

    @Post()
    async create(@Body(ValidationPipe) userAppRolesDto: UserAppRolesDto) {
        return this.userAppRolesService.create(userAppRolesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.userAppRolesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.userAppRolesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.userAppRolesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) userAppRolesDto: UserAppRolesDto,
    ) {
        return this.userAppRolesService.updateById(id, userAppRolesDto);
    }
}