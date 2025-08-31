import { Module } from '@nestjs/common';
import { OrganizationAddressesController } from './organization-addresses.controller';
import { OrganizationAddressesRepository } from './organization-addresses.repository';
import { OrganizationAddressesService } from './organization-addresses.service';

@Module({
    imports: [],
    controllers: [OrganizationAddressesController],
    providers: [OrganizationAddressesRepository, OrganizationAddressesService],
    exports: [OrganizationAddressesService]
})
export class OrganizationAddressesModule { }
