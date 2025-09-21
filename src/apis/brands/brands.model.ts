import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;
}
