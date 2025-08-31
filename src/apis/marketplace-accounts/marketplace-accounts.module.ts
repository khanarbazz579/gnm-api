import { Module } from '@nestjs/common';
import { MarketplaceAccountsController } from './marketplace-accounts.controller';
import { MarketplaceAccountsRepository } from './marketplace-accounts.repository';
import { MarketplaceAccountsService } from './marketplace-accounts.service';
import { CommonModule } from 'src/common/common.module';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
    imports: [ CommonModule, CredentialsModule ],
    controllers: [MarketplaceAccountsController],
    providers: [MarketplaceAccountsRepository, MarketplaceAccountsService],
    exports: [MarketplaceAccountsService]
})
export class MarketplaceAccountsModule { }
