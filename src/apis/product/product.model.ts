import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { SubCategory } from "../sub-categories/sub-categories.model";
import { Brands } from "../brands/brands.model";

@Table({ tableName: "products" })
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: "name",
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: "sku",
    allowNull: false,
  })
  sku: string;

  @Column({
    type: DataType.TEXT,
    field: "description",
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DOUBLE,
    field: "price",
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DOUBLE,
    field: "selling_price",
    allowNull: false,
  })
  sellingPrice: number;

  @Column({
    type: DataType.STRING,
    field: "thumb_images",
    allowNull: true,
  })
  thumbImages: string;

  @Column({
    type: DataType.JSONB,
    field: "images",
    allowNull: true,
  })
  images: string[];

  @Column({
    type: DataType.STRING,
    field: "brand_name",
    allowNull: false,
  })
  brandName: string;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    field: "sub_category_id",
  })
  subCategoryId: number;

  @BelongsTo(() => SubCategory, "subCategoryId")
  subCategory: SubCategory;

  @ForeignKey(() => Brands)
  @Column({
    type: DataType.INTEGER,
    field: "brand_id",
  })
  brandId: number;
}
