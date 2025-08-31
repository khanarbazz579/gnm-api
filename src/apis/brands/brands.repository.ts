import { Brands } from './brands.model';

export const BRANDS_REPOSITORY = 'BRANDS_REPOSITORY';

export const BrandsRepository = {
  provide: BRANDS_REPOSITORY,
  useValue: Brands,
};
