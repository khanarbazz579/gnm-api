import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CanLoggerModule } from '../logger/logger.module';
import { UserRepository } from './user.repository';
import { CommonModule } from 'src/common/common.module';
import { SharedModule } from 'src/apis/shared/shared.module';
import { UserRoleModule } from '../auth/user-role/user-role.module';
import { CanCommonModule } from '@can/common';
import { UserAppRolePermissionsModule } from 'src/apis/user-app-role-permissions/user-app-role-permissions.module';
import { RedisModule } from 'src/common/services/redis/redis.module';
import { ApplicationsModule } from 'src/apis/applications/applications.module';

@Module({
  imports: [
    CanLoggerModule,
    CommonModule,
    CanCommonModule,
    SharedModule,
    UserRoleModule,
    UserAppRolePermissionsModule,
    RedisModule,
    ApplicationsModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
