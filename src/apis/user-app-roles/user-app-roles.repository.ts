import { UserAppRoles } from './user-app-roles.model';

export const USER_APP_ROLES_REPOSITORY = 'USER_APP_ROLES_REPOSITORY';

export const UserAppRolesRepository = {
  provide: USER_APP_ROLES_REPOSITORY,
  useValue: UserAppRoles,
};
