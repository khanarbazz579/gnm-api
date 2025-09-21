import { Category } from "./categories.model";

export const CATEGORY_REPOSITORY = "CATEGORY_REPOSITORY";

export const CategoriesRepository = {
  provide: CATEGORY_REPOSITORY,
  useValue: Category,
};
