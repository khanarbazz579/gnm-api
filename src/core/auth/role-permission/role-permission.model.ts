import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Permission } from "../permission/permission.model";
import { Role } from "../role/role.model";

export enum RolePermissionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "role_permission",
  timestamps: true,
  underscored: true,
})
export class RolePermission extends Model<RolePermission> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role, "roleId")
  role: Role;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER })
  permissionId: number;

  @BelongsTo(() => Permission, "permissionId")
  permission: Permission;

  @Column({
    type: DataType.ENUM(...Object.values(RolePermissionStatus)),
    allowNull: false,
    defaultValue: RolePermissionStatus.ACTIVE,
  })
  status: RolePermissionStatus;
}
