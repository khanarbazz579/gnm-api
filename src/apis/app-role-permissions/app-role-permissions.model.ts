import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";
import { Role } from "src/core/auth/role/role.model";
import { Permission } from "src/core/auth/permission/permission.model";
import { Applications } from "../applications/applications.model";
import { Status } from "src/common/enums/status.enum";
import { AppPermissions } from "../app-permissions/app-permissions.model";
import { AppRoles } from "../app-roles/app-roles.model";

@Table({
  tableName: "app_role_permissions",
  timestamps: true,
  underscored: true,
})
export class AppRolePermissions extends Model<AppRolePermissions> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "created_by_id",
  })
  createdById: number;

  @BelongsTo(() => User, "createdById")
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "updated_by_id",
  })
  updatedById: number;

  @BelongsTo(() => User, "updatedById")
  updatedBy: User;

  @ForeignKey(() => AppRoles)
  @Column({ type: DataType.INTEGER, field: 'app_role_id' })
  appRoleId: number;

  @BelongsTo(() => AppRoles, 'appRoleId')
  appRole: AppRoles;

  @ForeignKey(() => AppPermissions)
  @Column({ type: DataType.INTEGER, field: 'app_permission_id' })
  appPermissionId: number;

  @BelongsTo(() => AppPermissions, 'appPermissionId')
  appPermission: AppPermissions;


  @ForeignKey(() => Applications)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  appId: number;

  @BelongsTo(() => Applications, "appId")
  app: Applications;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  status: Status;
}
