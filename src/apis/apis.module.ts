import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CronModule } from 'src/common/cron/cron.module';
import { ApplicationsModule } from 'src/apis/applications/applications.module';
import { OrganizationsModule } from 'src/apis/organizations/organizations.module';
import { OrganizationAddressesModule } from 'src/apis/organization-addresses/organization-addresses.module';
import { OrganizationUsersModule } from 'src/apis/organization-users/organization-users.module';
import { BrandsModule } from 'src/apis/brands/brands.module';
import { CategoriesModule } from 'src/apis/categories/categories.module';
import { AppPermissionsModule } from 'src/apis/app-permissions/app-permissions.module';
import { AppRolePermissionsModule } from 'src/apis/app-role-permissions/app-role-permissions.module';
import { AppRolesModule } from 'src/apis/app-roles/app-roles.module';
import { UserAppRolePermissionsModule } from 'src/apis/user-app-role-permissions/user-app-role-permissions.module';
import { UserAppRolesModule } from 'src/apis/user-app-roles/user-app-roles.module';import { MarketplaceAccountsModule } from 'src/apis/marketplace-accounts/marketplace-accounts.module';import { CredentialsModule } from 'src/apis/credentials/credentials.module';




@Module({
    imports: [
        SharedModule,
        CronModule
    , ApplicationsModule, OrganizationsModule, OrganizationAddressesModule, OrganizationUsersModule, BrandsModule, CategoriesModule, AppPermissionsModule, AppRolePermissionsModule, AppRolesModule, UserAppRolePermissionsModule, UserAppRolesModule, MarketplaceAccountsModule, CredentialsModule],
    providers: [],
    exports: []
})
export class ApisModule {
}
