import { Module } from '@nestjs/common';
import { OrganizationUsersController } from './organization-users.controller';
import { OrganizationUsersRepository } from './organization-users.repository';
import { OrganizationUsersService } from './organization-users.service';

@Module({
    imports: [],
    controllers: [OrganizationUsersController],
    providers: [OrganizationUsersRepository, OrganizationUsersService],
    exports: [OrganizationUsersService]
})
export class OrganizationUsersModule { }
