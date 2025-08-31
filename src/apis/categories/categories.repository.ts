import { Categories } from './categories.model';

export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export const CategoriesRepository = {
  provide: CATEGORIES_REPOSITORY,
  useValue: Categories,
};
