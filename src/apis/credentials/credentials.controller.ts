import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, ValidationPipe, Patch, Put } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { FindOptions, UpdateOptions } from 'sequelize';
import { CredentialsDto } from './credentials.dto';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';

@Controller('credentials')
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) { }

  @Get()
  async findAll(@Query('filter') filter: FindOptions) {
    return this.credentialsService.findAll(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.credentialsService.findById(id,'true');
  }

  @Post()
  async create(@Body(ValidationPipe) credentials: CredentialsDto) {
    return this.credentialsService.create(credentials);
  }

  @Patch(':id')
  async updateById(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ skipMissingProperties: true })) accountEntityTaskMapping: CredentialsDto) {
    return this.credentialsService.updateById(id, accountEntityTaskMapping);
  }

  @Put()
  async update(@Query('filter', ParseFilterPipe) filter: UpdateOptions, @Body(new ValidationPipe({ skipMissingProperties: true })) accountEntityTaskMapping: CredentialsDto) {
    return this.credentialsService.update(accountEntityTaskMapping, filter);
  }
}
