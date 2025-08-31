import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/core/user/user.model";
import { Applications } from "../applications/applications.model";
import { Status } from "src/common/enums/status.enum";

@Table({ tableName: "app_roles", timestamps: true, underscored: true })
export class AppRoles extends Model<AppRoles> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "created_by_id",
  })
  createdById: number;

  @BelongsTo(() => User, "createdById")
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "updated_by_id",
  })
  updatedById: number;

  @BelongsTo(() => User, "updatedById")
  updatedBy: User;

  @ForeignKey(() => Applications)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  appId: number;

  @BelongsTo(() => Applications, "appId")
  app: Applications;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  meta: any;
}
