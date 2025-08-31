import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_ADDRESSES_REPOSITORY } from './organization-addresses.repository';
import { OrganizationAddresses } from './organization-addresses.model';
import { OrganizationAddressesDto } from './organization-addresses.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class OrganizationAddressesService {
  constructor(
    @Inject(ORGANIZATION_ADDRESSES_REPOSITORY) private readonly organizationAddressesRepository: typeof OrganizationAddresses
  ) {}

  async create(organizationAddresses: OrganizationAddressesDto): Promise<OrganizationAddresses> {
    return this.organizationAddressesRepository.create<OrganizationAddresses>(organizationAddresses);
  }

  async findAll(filter: FindOptions) {
    return this.organizationAddressesRepository.findAll(filter);
  }

  async findById(id: number): Promise<OrganizationAddresses> {
    return this.organizationAddressesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.organizationAddressesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.organizationAddressesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.organizationAddressesRepository.upsert(data);
  }
}
