import { Module } from '@nestjs/common';
import { AppRolePermissionsController } from './app-role-permissions.controller';
import { AppRolePermissionsRepository } from './app-role-permissions.repository';
import { AppRolePermissionsService } from './app-role-permissions.service';

@Module({
    imports: [],
    controllers: [AppRolePermissionsController],
    providers: [AppRolePermissionsRepository, AppRolePermissionsService],
    exports: [AppRolePermissionsService]
})
export class AppRolePermissionsModule { }
