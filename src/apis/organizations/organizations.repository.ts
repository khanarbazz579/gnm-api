import { Organizations } from './organizations.model';

export const ORGANIZATIONS_REPOSITORY = 'ORGANIZATIONS_REPOSITORY';

export const OrganizationsRepository = {
  provide: ORGANIZATIONS_REPOSITORY,
  useValue: Organizations,
};
