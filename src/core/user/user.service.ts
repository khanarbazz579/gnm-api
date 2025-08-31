import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { FindOptions, CountOptions, Optional } from 'sequelize';
import { CanLogger } from '../logger/logger.service';
import {
  excludePropertyFromFind,
  excludePropertyFromModel,
} from '../../common/utils/exclude';
import { hashPassword } from '../../common/utils/bcrypt';
import { CanContextService, CanCurrentUser } from '@can/common';
import { UserAppRolePermissionsService } from 'src/apis/user-app-role-permissions/user-app-role-permissions.service';
import { CanRedisService } from 'src/common/services/redis/redis.service';
import { ApplicationsService } from 'src/apis/applications/applications.service';
import { QueryService } from 'src/common/services/query/query.service';
import { CanRedisKeysService } from 'src/common/services/redis/redis-keys.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private canLogger: CanLogger,
    private userAppRolePermissionsService: UserAppRolePermissionsService,
    private redisService: CanRedisService,
    private applicationService: ApplicationsService,
    private redisKeysService: CanRedisKeysService

  ) {
    // Initialize Logger
    // this.canLogger.setContext('UserService');
  }

  async create(user: UserDto): Promise<UserDto> {
    return excludePropertyFromModel<User, UserDto>(
      await this.userRepository.create(<any>user),
      ['password', 'loginOtp', 'resetPasswordOtpExpiresIn', 'resetPasswordOtp'],
    );
  }

  async findAll(filter: FindOptions) {
    return this.userRepository.findAll(
      excludePropertyFromFind(filter, [
        'loginInfo',
        'password',
        'loginOtp',
        'resetPasswordOtpExpiresIn',
        'resetPasswordOtp',
      ]),
    );
  }

  async findOne(filter: FindOptions) {
    return this.userRepository.findOne(filter);
  }

  async findById(id: number): Promise<UserDto> {
    return excludePropertyFromModel<User, UserDto>(
      await this.userRepository.findByPk(id),
      ['password', 'resetPasswordExpiresIn', 'resetPasswordToken'],
    );
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, userDto: Partial<UserDto>): Promise<UserDto> {
    const user = await this.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }
    const clonedUserDto = { ...userDto };
    if (clonedUserDto.password) {
      clonedUserDto.password = await hashPassword(userDto.password);
    }
    return excludePropertyFromModel<User, UserDto>(
      await user.update(<any>clonedUserDto, { where: { id } }),
      ['password', 'resetPasswordExpiresIn', 'resetPasswordToken'],
    );
  }

  async upsert(userDto: UserDto) {
    return this.userRepository.upsert(<any>userDto);
  }

    
  async activeAppUsers(currentUser: CanCurrentUser, appId: number) {
    const appContext = CanContextService.getAppContext();
    const queryService = appContext.get(QueryService);
    const app = await this.applicationService.findById(appId);
    let activeApp = await this.redisService.get(
      this.redisKeysService.appUserKey(currentUser, app)
    );
    // let activeApp =  await client.get(JSON.stringify({userId:currentUser['user_id'], appId}))
    if (!activeApp) {
      activeApp = await this.userAppRolePermissionsService.getUserAppRolePermissionDetails(currentUser['user_id'],appId);
      if (activeApp.length > 0) {
        const appDetails = {...activeApp[0],clientId: currentUser.clientId};
        activeApp = [appDetails];
        await this.redisService.set(
          this.redisKeysService.appUserKey(currentUser, app),
          JSON.stringify(appDetails)
        );
      }
      //  client.setex(JSON.stringify({userId:currentUser['user_id'], appId}), 600, JSON.stringify(activeApp));
    } else {
      activeApp = JSON.parse(activeApp);
      if (activeApp.length > 0) {
        activeApp = activeApp[0];
      } else {
        activeApp = activeApp;
      }
    }
    const mappedUser = {...activeApp,clientId: currentUser.clientId};
    const appPermissions: any = {};
    if (mappedUser && 'appPermissions' in mappedUser) {
      mappedUser.appPermissions.forEach(
        (permission) => (appPermissions[permission] = true)
      );

      mappedUser['appPermissions'] = appPermissions;
    }
    return mappedUser;
  }

}
