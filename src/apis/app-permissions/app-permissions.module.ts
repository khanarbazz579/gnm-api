import { Module } from '@nestjs/common';
import { AppPermissionsController } from './app-permissions.controller';
import { AppPermissionsRepository } from './app-permissions.repository';
import { AppPermissionsService } from './app-permissions.service';

@Module({
    imports: [],
    controllers: [AppPermissionsController],
    providers: [AppPermissionsRepository, AppPermissionsService],
    exports: [AppPermissionsService]
})
export class AppPermissionsModule { }
