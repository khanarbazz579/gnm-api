import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { MarketplaceAccountsStatus, Marketplaces } from './marketplace-accounts.dto';
import { Organizations as Organizations } from '../organizations/organizations.model';
import { Credentials } from '../credentials/credentials.model';


@Table({ 
  tableName: 'marketplace_accounts',
  timestamps: true,
  underscored: true,
 })
export class MarketplaceAccounts extends Model<MarketplaceAccounts> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
  })
  accountId: string;

  @Column({
    type: DataType.STRING,
  })
  sellerId: string;

  @Column({
    type: DataType.STRING,
  })
  marketplace: Marketplaces;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  displayName: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isOtpLogin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  apiAccess: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  companyCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  channelCode: string;
    
  @Column({
    type: DataType.ENUM(...Object.values(MarketplaceAccountsStatus)),
    allowNull: false,
  })
  status: MarketplaceAccountsStatus; 

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  meta: any;
      
  @ForeignKey(() => Organizations)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  organizationId: number;

  @BelongsTo(() => Organizations, "organizationId")
  organization: Organizations;

  @ForeignKey(() => Credentials)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  credentialId: number;

  @BelongsTo(() => Credentials, "credentialId")
  credentialsData: Credentials;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'created_by_id',
  })
  createdById: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'updated_by_id',
  })
  updatedById: number;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
