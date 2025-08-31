import { OrganizationUsers } from './organization-users.model';

export const ORGANIZATION_USERS_REPOSITORY = 'ORGANIZATION_USERS_REPOSITORY';

export const OrganizationUsersRepository = {
  provide: ORGANIZATION_USERS_REPOSITORY,
  useValue: OrganizationUsers,
};
