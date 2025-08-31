import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_USERS_REPOSITORY } from './organization-users.repository';
import { OrganizationUsers } from './organization-users.model';
import { OrganizationUsersDto } from './organization-users.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class OrganizationUsersService {
  constructor(
    @Inject(ORGANIZATION_USERS_REPOSITORY) private readonly organizationUsersRepository: typeof OrganizationUsers
  ) {}

  async create(organizationUsers: OrganizationUsersDto): Promise<OrganizationUsers> {
    return this.organizationUsersRepository.create<OrganizationUsers>(organizationUsers);
  }

  async findAll(filter: FindOptions) {
    return this.organizationUsersRepository.findAll(filter);
  }

  async findById(id: number): Promise<OrganizationUsers> {
    return this.organizationUsersRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.organizationUsersRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.organizationUsersRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.organizationUsersRepository.upsert(data);
  }
}
