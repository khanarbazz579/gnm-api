import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { hashPassword } from "../../common/utils/bcrypt";
import { UserRole } from "../auth/user-role/user-role.model";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true,
  // defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    allowNull: false,
    defaultValue: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  meta: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  middleName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobile: string;

  @Column({
    type: DataType.STRING,
  })
  loginInfo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
  })
  resetPasswordOtpExpiresIn: string;

  @Column({
    type: DataType.STRING,
  })
  loginOtp: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otpSecret: string;

  @Column({
    type: DataType.STRING,
  })
  resetPasswordOtp: string;

  @Column({
    type: DataType.STRING,
    values: ["male", "female", "unisex"],
  })
  gender: string;

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

  @HasMany(() => UserRole, "userId")
  roles: UserRole[];

  @Column({
    type: DataType.STRING,
    field: "type",
    defaultValue: "internal",
  })
  type: "application" | "internal" | "external";

  @BeforeCreate
  static async beforeCreateHook(user: User) {
    if (user.firstName || user.middleName || user.lastName) {
      user.name = `${user.firstName}${
        user.middleName ? " " + user.middleName : ""
      } ${user.lastName}`;
    }
    if (user.email) {
      user.email = user.email.trim().toLowerCase();
    }
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  }
}
