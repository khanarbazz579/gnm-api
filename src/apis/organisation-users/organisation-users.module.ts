import { Module } from '@nestjs/common';
import { OrganizationUsersController } from './organisation-users.controller';
import { OrganizationUsersRepository } from './organisation-users.repository';
import { OrganizationUsersService } from './organisation-users.service';

@Module({
    imports: [],
    controllers: [OrganizationUsersController],
    providers: [OrganizationUsersRepository, OrganizationUsersService],
    exports: [OrganizationUsersService]
})
export class OrganizationUsersModule { }
