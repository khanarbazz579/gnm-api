import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
// import { User } from 'src/core/user/user.model';
import { RolePermission } from "../role-permission/role-permission.model";

export enum RoleStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "roles",
  timestamps: true,
  underscored: true,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @HasMany(() => RolePermission, "roleId")
  permissions: RolePermission[];

  @Column({
    type: DataType.ENUM(...Object.values(RoleStatus)),
    allowNull: false,
    defaultValue: RoleStatus.ACTIVE,
  })
  status: RoleStatus;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  meta: any;

  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'created_by_id',
  // })
  // createdById: number;

  // @BelongsTo(() => User, 'createdById')
  // createdBy: User;

  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'updated_by_id',
  // })
  // updatedById: number;

  // @BelongsTo(() => User, 'updatedById')
  // updatedBy: User;
}
