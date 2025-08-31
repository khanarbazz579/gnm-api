import { Injectable, Inject } from '@nestjs/common';
import { BRANDS_REPOSITORY } from './brands.repository';
import { Brands } from './brands.model';
import { BrandsDto } from './brands.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class BrandsService {
  constructor(
    @Inject(BRANDS_REPOSITORY) private readonly brandsRepository: typeof Brands
  ) {}

  async create(brands: BrandsDto): Promise<Brands> {
    return this.brandsRepository.create<Brands>(brands);
  }

  async findAll(filter: FindOptions) {
    return this.brandsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Brands> {
    return this.brandsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.brandsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.brandsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.brandsRepository.upsert(data);
  }
}
