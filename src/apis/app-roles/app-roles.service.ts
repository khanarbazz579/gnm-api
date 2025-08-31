import { Injectable, Inject } from '@nestjs/common';
import { APP_ROLES_REPOSITORY } from './app-roles.repository';
import { AppRoles } from './app-roles.model';
import { AppRolesDto } from './app-roles.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class AppRolesService {
  constructor(
    @Inject(APP_ROLES_REPOSITORY) private readonly appRolesRepository: typeof AppRoles
  ) {}

  async create(appRoles: AppRolesDto): Promise<AppRoles> {
    return this.appRolesRepository.create<AppRoles>(appRoles);
  }

  async findAll(filter: FindOptions) {
    return this.appRolesRepository.findAll(filter);
  }

  async findById(id: number): Promise<AppRoles> {
    return this.appRolesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.appRolesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.appRolesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.appRolesRepository.upsert(data);
  }
}
