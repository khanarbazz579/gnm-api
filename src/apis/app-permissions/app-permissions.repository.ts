import { AppPermissions } from './app-permissions.model';

export const APP_PERMISSIONS_REPOSITORY = 'APP_PERMISSIONS_REPOSITORY';

export const AppPermissionsRepository = {
  provide: APP_PERMISSIONS_REPOSITORY,
  useValue: AppPermissions,
};
