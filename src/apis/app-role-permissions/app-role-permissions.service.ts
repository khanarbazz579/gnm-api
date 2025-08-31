import { Injectable, Inject } from '@nestjs/common';
import { APP_ROLE_PERMISSIONS_REPOSITORY } from './app-role-permissions.repository';
import { AppRolePermissions } from './app-role-permissions.model';
import { AppRolePermissionsDto } from './app-role-permissions.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class AppRolePermissionsService {
  constructor(
    @Inject(APP_ROLE_PERMISSIONS_REPOSITORY) private readonly appRolePermissionsRepository: typeof AppRolePermissions
  ) {}

  async create(appRolePermissions: AppRolePermissionsDto): Promise<AppRolePermissions> {
    return this.appRolePermissionsRepository.create<AppRolePermissions>(appRolePermissions);
  }

  async findAll(filter: FindOptions) {
    return this.appRolePermissionsRepository.findAll(filter);
  }

  async findById(id: number): Promise<AppRolePermissions> {
    return this.appRolePermissionsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.appRolePermissionsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.appRolePermissionsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.appRolePermissionsRepository.upsert(data);
  }
}
