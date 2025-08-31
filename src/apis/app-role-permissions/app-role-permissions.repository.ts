import { AppRolePermissions } from './app-role-permissions.model';

export const APP_ROLE_PERMISSIONS_REPOSITORY = 'APP_ROLE_PERMISSIONS_REPOSITORY';

export const AppRolePermissionsRepository = {
  provide: APP_ROLE_PERMISSIONS_REPOSITORY,
  useValue: AppRolePermissions,
};
