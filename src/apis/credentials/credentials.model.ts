import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { MarketplaceAccounts } from '../marketplace-accounts/marketplace-accounts.model';

@Table({ tableName: 'credentials' })
export class Credentials extends Model<Credentials> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'cred_type',
  })
  credType: string;

  @Column({
    type: DataType.STRING,
    field: 'company_code',
  })
  companyCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'account_id',
  })
  accountId: string;

  @Column({
    type: DataType.STRING,
    field: 'channel_code',
  })
  channelCode: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'client_id',
  })
  clientId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'credentials',
  })
  credentials: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt: Date;

}
