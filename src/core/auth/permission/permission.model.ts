import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";
import { Role } from "../role/role.model";

export enum PermissionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "permissions",
  timestamps: true,
  underscored: true,
})
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  subject: string;

  @Column({
    type: DataType.ENUM(...Object.values(PermissionStatus)),
    allowNull: false,
    defaultValue: PermissionStatus.ACTIVE,
  })
  status: PermissionStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  createdById: number;

  @BelongsTo(() => User, "createdById")
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  updatedById: number;

  @BelongsTo(() => User, "updatedById")
  updatedBy: User;
}
