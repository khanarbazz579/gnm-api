import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
// import { User } from 'src/core/user/user.model';
import { Role } from "../role/role.model";
import { User } from "src/core/user/user.model";
import { Status } from "src/common/enums/status.enum";

@Table({ tableName: "user_role" })
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: "user_id" })
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, field: "role_id" })
  roleId: number;

  @BelongsTo(() => Role, "roleId")
  role: Role;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.ACTIVE,
  })
  status: Status;
}
