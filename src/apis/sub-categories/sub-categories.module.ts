import { forwardRef, Module } from "@nestjs/common";
import { SubCategoryController } from "./sub-categories.controller";
import { SubCategoryService } from "./sub-categories.service";
import { SubCategoryRepository } from "./sub-categories.repository";

@Module({
  imports: [],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepository],
  exports: [SubCategoryService],
})
export class SubCategoriesModule {}
