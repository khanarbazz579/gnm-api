import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";

export enum OrganizationStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Table({
  tableName: "organizations",
  timestamps: true,
  underscored: true,
})
export class Organizations extends Model<Organizations> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  displayName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  legalName: string;

  @Column({
    type: DataType.STRING(21),
    allowNull: true,
  })
  cin: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  pan: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrganizationStatus)),
    allowNull: false,
  })
  status: OrganizationStatus;

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
