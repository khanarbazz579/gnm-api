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

export enum BrandStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Table({
  tableName: "brands",
  timestamps: true,
  underscored: true,
})
export class Brands extends Model<Brands> {
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
  organisationId: number;

  @BelongsTo(() => Organizations, "organisationId")
  organisation: Organizations;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  website: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  primarySocialChannel: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: true,
  })
  avgMonthlyInfluencerSpend: number;

  @Column({
    type: DataType.ENUM(...Object.values(BrandStatus)),
    allowNull: false,
    defaultValue: BrandStatus.ACTIVE,
  })
  status: BrandStatus;

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
