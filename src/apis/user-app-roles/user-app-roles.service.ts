import { Injectable, Inject } from '@nestjs/common';
import { USER_APP_ROLES_REPOSITORY } from './user-app-roles.repository';
import { UserAppRoles } from './user-app-roles.model';
import { UserAppRolesDto } from './user-app-roles.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class UserAppRolesService {
  constructor(
    @Inject(USER_APP_ROLES_REPOSITORY) private readonly userAppRolesRepository: typeof UserAppRoles
  ) {}

  async create(userAppRoles: UserAppRolesDto): Promise<UserAppRoles> {
    return this.userAppRolesRepository.create<UserAppRoles>(userAppRoles);
  }

  async findAll(filter: FindOptions) {
    return this.userAppRolesRepository.findAll(filter);
  }

  async findById(id: number): Promise<UserAppRoles> {
    return this.userAppRolesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userAppRolesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.userAppRolesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.userAppRolesRepository.upsert(data);
  }
}
