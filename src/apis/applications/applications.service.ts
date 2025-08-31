import { Injectable, Inject } from '@nestjs/common';
import { APPLICATIONS_REPOSITORY } from './applications.repository';
import { Applications } from './applications.model';
import { ApplicationsDto } from './applications.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject(APPLICATIONS_REPOSITORY) private readonly applicationsRepository: typeof Applications
  ) {}

  async create(applications: ApplicationsDto): Promise<Applications> {
    return this.applicationsRepository.create<Applications>(applications);
  }

  async findAll(filter: FindOptions) {
    return this.applicationsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Applications> {
    return this.applicationsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.applicationsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.applicationsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.applicationsRepository.upsert(data);
  }
}
