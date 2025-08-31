import { Credentials } from './credentials.model';

export const CREDENTIALS_REPOSITORY = 'CREDENTIALS_REPOSITORY';

export const CredentialsRepository = {
  provide: CREDENTIALS_REPOSITORY,
  useValue: Credentials,
};
