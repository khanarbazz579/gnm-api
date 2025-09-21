import { SubCategory } from "./sub-categories.model";

export const SUBCATEGORY_REPOSITORY = "SUBCATEGORY_REPOSITORY";

export const SubCategoryRepository = {
  provide: SUBCATEGORY_REPOSITORY,
  useValue: SubCategory,
};
