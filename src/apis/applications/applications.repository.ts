import { Applications } from './applications.model';

export const APPLICATIONS_REPOSITORY = 'APPLICATIONS_REPOSITORY';

export const ApplicationsRepository = {
  provide: APPLICATIONS_REPOSITORY,
  useValue: Applications,
};
