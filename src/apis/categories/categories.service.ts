import { Injectable, Inject } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from './categories.repository';
import { Categories } from './categories.model';
import { CategoriesDto } from './categories.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY) private readonly categoriesRepository: typeof Categories
  ) {}

  async create(categories: CategoriesDto): Promise<Categories> {
    return this.categoriesRepository.create<Categories>(categories);
  }

  async findAll(filter: FindOptions) {
    return this.categoriesRepository.findAll(filter);
  }

  async findById(id: number): Promise<Categories> {
    return this.categoriesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.categoriesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.categoriesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.categoriesRepository.upsert(data);
  }
}
