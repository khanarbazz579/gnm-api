import { forwardRef, Module } from '@nestjs/common';
import { UserAppRolePermissionsController } from './user-app-role-permissions.controller';
import { UserAppRolePermissionsRepository } from './user-app-role-permissions.repository';
import { UserAppRolePermissionsService } from './user-app-role-permissions.service';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [ forwardRef(() =>CommonModule)],
    controllers: [UserAppRolePermissionsController],
    providers: [UserAppRolePermissionsRepository, UserAppRolePermissionsService],
    exports: [UserAppRolePermissionsService]
})
export class UserAppRolePermissionsModule { }
