import { Module } from '@nestjs/common';
import { AppRolesController } from './app-roles.controller';
import { AppRolesRepository } from './app-roles.repository';
import { AppRolesService } from './app-roles.service';

@Module({
    imports: [],
    controllers: [AppRolesController],
    providers: [AppRolesRepository, AppRolesService],
    exports: [AppRolesService]
})
export class AppRolesModule { }
