import { AppRoles } from './app-roles.model';

export const APP_ROLES_REPOSITORY = 'APP_ROLES_REPOSITORY';

export const AppRolesRepository = {
  provide: APP_ROLES_REPOSITORY,
  useValue: AppRoles,
};
