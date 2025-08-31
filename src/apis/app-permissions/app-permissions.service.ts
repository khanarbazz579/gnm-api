import { Injectable, Inject } from '@nestjs/common';
import { APP_PERMISSIONS_REPOSITORY } from './app-permissions.repository';
import { AppPermissions } from './app-permissions.model';
import { AppPermissionsDto } from './app-permissions.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class AppPermissionsService {
  constructor(
    @Inject(APP_PERMISSIONS_REPOSITORY) private readonly appPermissionsRepository: typeof AppPermissions
  ) {}

  async create(appPermissions: AppPermissionsDto): Promise<AppPermissions> {
    return this.appPermissionsRepository.create<AppPermissions>(appPermissions);
  }

  async findAll(filter: FindOptions) {
    return this.appPermissionsRepository.findAll(filter);
  }

  async findById(id: number): Promise<AppPermissions> {
    return this.appPermissionsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.appPermissionsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.appPermissionsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.appPermissionsRepository.upsert(data);
  }
}
