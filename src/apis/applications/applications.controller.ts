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
import { ApplicationsDto } from './applications.dto';
import { ApplicationsService } from './applications.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('applications')
export class ApplicationsController { 
    constructor(private applicationsService: ApplicationsService) {}

    @Post()
    async create(@Body(ValidationPipe) applicationsDto: ApplicationsDto) {
        return this.applicationsService.create(applicationsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.applicationsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.applicationsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.applicationsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) applicationsDto: ApplicationsDto,
    ) {
        return this.applicationsService.updateById(id, applicationsDto);
    }
}