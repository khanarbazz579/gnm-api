import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { SubCategoryService } from "./sub-categories.service";
import { SubCategoryDto } from "./sub-categories.dto";
import { ParseFilterPipe } from "src/common/pipes/parse-filter.pipe";
import { CountOptions, FindOptions } from "sequelize";

@Controller("subCategories")
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post()
  async create(@Body(ValidationPipe) subCategoryDto: SubCategoryDto) {
    return this.subCategoryService.create(subCategoryDto);
  }

  @Get()
  async findAll(@Query("filter", ParseFilterPipe) filter: FindOptions) {
    return this.subCategoryService.findAll(filter);
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return this.subCategoryService.findById(id);
  }

  @Get("count")
  async count(@Query("filter", ParseFilterPipe) filter: CountOptions) {
    return this.subCategoryService.count(filter);
  }

  @Patch(":id")
  async updateById(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    subCategoryDto: SubCategoryDto,
  ) {
    return this.subCategoryService.updateById(id, subCategoryDto);
  }
}
