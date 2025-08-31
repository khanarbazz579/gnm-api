import { MarketplaceAccounts } from './marketplace-accounts.model';

export const MARKETPLACEACCOUNTS_REPOSITORY = 'MARKETPLACEACCOUNTS_REPOSITORY';

export const MarketplaceAccountsRepository = {
  provide: MARKETPLACEACCOUNTS_REPOSITORY,
  useValue: MarketplaceAccounts,
};
