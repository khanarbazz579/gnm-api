import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { SUBCATEGORY_REPOSITORY } from "./sub-categories.repository";
import { SubCategory } from "./sub-categories.model";
import { SubCategoryDto } from "./sub-categories.dto";
import { CountOptions, FindOptions } from "sequelize";

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject(SUBCATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
  ) {}

  async create(subCategory: SubCategoryDto): Promise<SubCategory> {
    return this.subCategoryRepository.create<SubCategory>(subCategory);
  }

  async findAll(filter: FindOptions) {
    const subCategory = await this.subCategoryRepository.findAll(filter);
    return subCategory;
  }

  async findById(id: number): Promise<SubCategory> {
    return this.subCategoryRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.subCategoryRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.subCategoryRepository.update(data, { where: { id } });
  }
}
