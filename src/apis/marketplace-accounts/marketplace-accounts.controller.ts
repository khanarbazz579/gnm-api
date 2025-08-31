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
import { ConnectAccountsDto, MarketplaceAccountsDto } from './marketplace-accounts.dto';
import { MarketplaceAccountsService } from './marketplace-accounts.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanCurrentUser } from '@can/common/types/current-user.type';
import { CurrentUser } from '@can/common';

@Controller('marketplace-accounts')
export class MarketplaceAccountsController { 
    constructor(private marketplaceAccountsService: MarketplaceAccountsService) {}

    @Post()
    async create(@Body(ValidationPipe) marketplaceAccountsDto: MarketplaceAccountsDto) {
        return this.marketplaceAccountsService.create(marketplaceAccountsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.marketplaceAccountsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.marketplaceAccountsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.marketplaceAccountsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) marketplaceAccountsDto: MarketplaceAccountsDto,
    ) {
        return this.marketplaceAccountsService.updateById(id, marketplaceAccountsDto);
    }

    @Post('connect')
    async connectAccount(
        @Body(ValidationPipe) connectAccountsDto: ConnectAccountsDto,
        @CurrentUser() user: CanCurrentUser
    ) {
        return this.marketplaceAccountsService.connect(connectAccountsDto, user);
    }

    @Patch('save/:accountId')
    async saveAccount(
        @Param('accountId') accountId: string,
        @Body(new ValidationPipe({ skipMissingProperties: true })) marketplaceAccountsDto: MarketplaceAccountsDto,
        @CurrentUser() user: CanCurrentUser
    ) {
        return this.marketplaceAccountsService.save(accountId, marketplaceAccountsDto, user);
    }
}