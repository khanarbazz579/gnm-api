import { UserAppRolePermissions } from './user-app-role-permissions.model';

export const USER_APP_ROLE_PERMISSIONS_REPOSITORY = 'USER_APP_ROLE_PERMISSIONS_REPOSITORY';

export const UserAppRolePermissionsRepository = {
  provide: USER_APP_ROLE_PERMISSIONS_REPOSITORY,
  useValue: UserAppRolePermissions,
};
