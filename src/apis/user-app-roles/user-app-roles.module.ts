import { Module } from '@nestjs/common';
import { UserAppRolesController } from './user-app-roles.controller';
import { UserAppRolesRepository } from './user-app-roles.repository';
import { UserAppRolesService } from './user-app-roles.service';

@Module({
    imports: [],
    controllers: [UserAppRolesController],
    providers: [UserAppRolesRepository, UserAppRolesService],
    exports: [UserAppRolesService]
})
export class UserAppRolesModule { }
