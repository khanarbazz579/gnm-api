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
import { OrganizationUsersDto } from './organization-users.dto';
import { OrganizationUsersService } from './organization-users.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('organization-users')
export class OrganizationUsersController { 
    constructor(private organizationUsersService: OrganizationUsersService) {}

    @Post()
    async create(@Body(ValidationPipe) organizationUsersDto: OrganizationUsersDto) {
        return this.organizationUsersService.create(organizationUsersDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.organizationUsersService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.organizationUsersService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.organizationUsersService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) organizationUsersDto: OrganizationUsersDto,
    ) {
        return this.organizationUsersService.updateById(id, organizationUsersDto);
    }
}