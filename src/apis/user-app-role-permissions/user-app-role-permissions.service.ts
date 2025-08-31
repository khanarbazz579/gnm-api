import { Injectable, Inject } from '@nestjs/common';
import { USER_APP_ROLE_PERMISSIONS_REPOSITORY } from './user-app-role-permissions.repository';
import { UserAppRolePermissions } from './user-app-role-permissions.model';
import { UserAppRolePermissionsDto } from './user-app-role-permissions.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { QueryService } from 'src/common/services/query/query.service';
import { Query } from 'src/common/services/query/query';

@Injectable()
export class UserAppRolePermissionsService {
  constructor(
    @Inject(USER_APP_ROLE_PERMISSIONS_REPOSITORY) private readonly userAppRolePermissionsRepository: typeof UserAppRolePermissions,
    private queryService: QueryService
  ) {}

  async create(userAppRolePermissions: UserAppRolePermissionsDto): Promise<UserAppRolePermissions> {
    return this.userAppRolePermissionsRepository.create<UserAppRolePermissions>(userAppRolePermissions);
  }

  async findAll(filter: FindOptions) {
    return this.userAppRolePermissionsRepository.findAll(filter);
  }

  async findById(id: number): Promise<UserAppRolePermissions> {
    return this.userAppRolePermissionsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userAppRolePermissionsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.userAppRolePermissionsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.userAppRolePermissionsRepository.upsert(data);
  }

  async getUserAppRolePermissionDetails( userId: number, appId: number ){
    const appDetails = await this.queryService.executeQuery<any[]>(Query.getActiveAppUserAndPermissions(userId, appId))
    return appDetails;
  }
}
