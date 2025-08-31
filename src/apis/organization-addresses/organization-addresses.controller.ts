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
import { OrganizationAddressesDto } from './organization-addresses.dto';
import { OrganizationAddressesService } from './organization-addresses.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('organization-addresses')
export class OrganizationAddressesController { 
    constructor(private organizationAddressesService: OrganizationAddressesService) {}

    @Post()
    async create(@Body(ValidationPipe) organizationAddressesDto: OrganizationAddressesDto) {
        return this.organizationAddressesService.create(organizationAddressesDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.organizationAddressesService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.organizationAddressesService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.organizationAddressesService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) organizationAddressesDto: OrganizationAddressesDto,
    ) {
        return this.organizationAddressesService.updateById(id, organizationAddressesDto);
    }
}