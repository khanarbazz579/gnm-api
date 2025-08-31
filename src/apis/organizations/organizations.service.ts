import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATIONS_REPOSITORY} from './organizations.repository';
import { Organizations } from './organizations.model';
import { OrganizationsDto as OrganizationsDto } from './organizations.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject(ORGANIZATIONS_REPOSITORY) private readonly organizationsRepository: typeof Organizations
  ) {}

  async create(organizations: OrganizationsDto): Promise<Organizations> {
    return this.organizationsRepository.create<Organizations>(organizations);
  }

  async findAll(filter: FindOptions) {
    return this.organizationsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Organizations> {
    return this.organizationsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.organizationsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.organizationsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.organizationsRepository.upsert(data);
  }
}
