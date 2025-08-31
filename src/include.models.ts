import { Model, ModelCtor } from "sequelize-typescript";
import { User } from "./core/user/user.model";
import { Applications } from "./apis/applications/applications.model";
import { AppPermissions } from "./apis/app-permissions/app-permissions.model";
import { AppRoles } from "./apis/app-roles/app-roles.model";
import { Brands } from "./apis/brands/brands.model";
import { Categories } from "./apis/categories/categories.model";
import { OrganizationAddresses } from "./apis/organization-addresses/organization-addresses.model";
import { OrganizationUsers } from "./apis/organization-users/organization-users.model";
import { UserAppRolePermissions } from "./apis/user-app-role-permissions/user-app-role-permissions.model";
import { UserRole } from "./core/auth/user-role/user-role.model";
import { UserAppRoles } from "./apis/user-app-roles/user-app-roles.model";
import { Role } from "./core/auth/role/role.model";
import { Permission } from "./core/auth/permission/permission.model";
import { RolePermission } from "./core/auth/role-permission/role-permission.model";
import { Organizations } from "./apis/organizations/organizations.model";
import { AppRolePermissions } from "./apis/app-role-permissions/app-role-permissions.model";
import { MarketplaceAccounts } from "./apis/marketplace-accounts/marketplace-accounts.model";
import { Credentials } from "./apis/credentials/credentials.model";

export const MODELS: ModelCtor<Model<any, any>>[] = [
  // Define your models here
  User,
  Applications,
  AppPermissions,
  AppRoles,
  Brands,
  Categories,
  Organizations,
  OrganizationAddresses,
  OrganizationUsers,
  // UserAppRolePermissions,
  UserRole,
  UserAppRoles,
  Role,
  Permission,
  RolePermission,
  AppRolePermissions,
  MarketplaceAccounts,
  Credentials
];
