import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../categories/categories.model";

@Table({ tableName: "sub_categories" })
export class SubCategory extends Model<SubCategory> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "name",
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: "description",
  })
  description: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    // field: 'category_id',
    allowNull: false,
  })
  categoryId: number;
}
