import { OrganizationAddresses } from './organization-addresses.model';

export const ORGANIZATION_ADDRESSES_REPOSITORY = 'ORGANIZATION_ADDRESSES_REPOSITORY';

export const OrganizationAddressesRepository = {
  provide: ORGANIZATION_ADDRESSES_REPOSITORY,
  useValue: OrganizationAddresses,
};
