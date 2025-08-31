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

export enum AppPermissionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table({
  tableName: "app_permissions",
  timestamps: true,
  underscored: true,
})
export class AppPermissions extends Model<AppPermissions> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Applications)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  appId: number;

  @BelongsTo(() => Applications, "appId")
  app: Applications;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  subject: string;

  @Column({
    type: DataType.ENUM(...Object.values(AppPermissionStatus)),
    allowNull: false,
    defaultValue: AppPermissionStatus.ACTIVE,
  })
  status: AppPermissionStatus;

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
