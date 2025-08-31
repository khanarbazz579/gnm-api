import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";
import { Organizations } from "src/apis/organizations/organizations.model";
import { Role } from "src/core/auth/role/role.model";

export enum OrganizationUserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Table({
  tableName: "organization_users",
  timestamps: true,
  underscored: true,
})
export class OrganizationUsers extends Model<OrganizationUsers> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Organizations)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  organizationId: number;

  @BelongsTo(() => Organizations, "organizationId")
  organization: Organizations;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;

  @BelongsTo(() => Role, "roleId")
  role: Role;

  @Column({
    type: DataType.ENUM(...Object.values(OrganizationUserStatus)),
    allowNull: false,
    defaultValue: OrganizationUserStatus.ACTIVE,
  })
  status: OrganizationUserStatus;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  meta: any;

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
