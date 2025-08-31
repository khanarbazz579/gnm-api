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

export enum OrganizationAddressStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "organization_addresses",
  timestamps: true,
  underscored: true,
})
export class OrganizationAddresses extends Model<OrganizationAddresses> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  postalCode: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
  })
  gstNumber: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrganizationAddressStatus)),
    allowNull: false,
  })
  status: OrganizationAddressStatus;

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
