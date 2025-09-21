import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";
import { Brands } from "src/apis/brands/brands.model";

export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "categories",
  timestamps: true,
  underscored: true,
})
export class Category extends Model<Category> {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId: number;

  @BelongsTo(() => Category, "parentId")
  parent: Category;

  @ForeignKey(() => Brands)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  brandId: number;

  @BelongsTo(() => Brands, "brandId")
  brand: Brands;

  @Column({
    type: DataType.ENUM(...Object.values(CategoryStatus)),
    allowNull: false,
    defaultValue: CategoryStatus.ACTIVE,
  })
  status: CategoryStatus;

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
