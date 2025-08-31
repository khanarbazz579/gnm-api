import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { MARKETPLACEACCOUNTS_REPOSITORY } from './marketplace-accounts.repository';
import { MarketplaceAccounts } from './marketplace-accounts.model';
import { ConnectAccountsDto, MarketplaceAccountsDto, MarketplaceAccountsStatus, Marketplaces } from './marketplace-accounts.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { CanCurrentUser } from '@can/common';
import { EncryptionService } from 'src/common/services/encryption/encryption.service';
import { CredentialsService } from '../credentials/credentials.service';
@Injectable()
export class MarketplaceAccountsService {
  constructor(
    @Inject(MARKETPLACEACCOUNTS_REPOSITORY) private readonly marketplaceAccountsRepository: typeof MarketplaceAccounts,
    private configService: ConfigService,
    private encryptionService: EncryptionService,
    private credentialsService: CredentialsService
  ) {}

  async create(marketplaceAccounts: MarketplaceAccountsDto): Promise<MarketplaceAccounts> {
    return this.marketplaceAccountsRepository.create<MarketplaceAccounts>(marketplaceAccounts);
  }

  async findAll(filter: FindOptions) {
    return this.marketplaceAccountsRepository.findAll(filter);
  }

  async findOne(filter: FindOptions) {
    return this.marketplaceAccountsRepository.findOne(filter);
  }

  async findById(id: number): Promise<MarketplaceAccounts> {
    return this.marketplaceAccountsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.marketplaceAccountsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.marketplaceAccountsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.marketplaceAccountsRepository.upsert(data);
  }

  async connect(connectAccountsDto: ConnectAccountsDto, user: CanCurrentUser): Promise<Record<any, string>> {

      const response = {success: "Successfully created"}
      const uuid = randomUUID();
      const credentials = {
          username:connectAccountsDto.userName,
          password:connectAccountsDto.password,
          redirect_url: connectAccountsDto.redirectUrl
      };
      const displayName =connectAccountsDto.displayName ? connectAccountsDto.displayName: user?.orgDisplayName ? `${connectAccountsDto.marketplace}_${user?.orgDisplayName?.split(" ")[0]?.toLowerCase()}` : `${connectAccountsDto.marketplace}`;
      const isExist = await this.count({ where: { displayName }});
      if(isExist.count){
        throw new BadRequestException(`${displayName} already exist!`);
      }
      const marketplaceAccount: any = {
        ...connectAccountsDto,
        marketplace: connectAccountsDto.marketplace,
        accountId: connectAccountsDto.accountId || uuid,
        displayName,
        companyCode: displayName,
        createdById: user.user_id,
        updatedById: user.user_id,
        organizationId: user.clientId,
        userName: connectAccountsDto.userName,
        status: MarketplaceAccountsStatus.PENDING
      }
      marketplaceAccount['channelCode'] = `${user.clientId}_${marketplaceAccount.accountId}`;
      if([Marketplaces.AMAZON_SP].includes(connectAccountsDto.marketplace)){
        const amazonUrl = this.configService.get('AMAZON_SELLER_AUTHORIZE_CONSENT_URL_URL');
        const appId = this.configService.get('AMAZON_APP_ID');
        response['redirectUrl'] = `${amazonUrl}?application_id=${appId}&version=beta&state=${marketplaceAccount.accountId}`;
      }
      if([Marketplaces.AMAZON_SC].includes(connectAccountsDto.marketplace)){  
        marketplaceAccount['status'] = MarketplaceAccountsStatus.ACTIVE;
        marketplaceAccount['apiAccess'] = true;
      }
      if([Marketplaces.AMAZON_VC].includes(connectAccountsDto.marketplace)){
        credentials['country']= 'INDIA';
        marketplaceAccount['status'] = MarketplaceAccountsStatus.ACTIVE;
        marketplaceAccount['apiAccess'] = true;
      }
      if(Object.keys(credentials).length){
        const encryptedData = this.encryptData(credentials);
        marketplaceAccount['meta'] = encryptedData;
      }
      await this.create(marketplaceAccount);
      return response;
  }

  async save(accountId: string, data: any, user: CanCurrentUser){
    const marketplaceAccount = await this.findOne({where: {accountId}});
    if(!marketplaceAccount){
      throw new BadRequestException(`Invalid account: ${accountId}`);
    }
    const paylaod = {
      updateById: user.user_id,
      ...data
    }
    if(data.meta){
      paylaod['sellerId'] = data.meta.selling_partner_id;
      const credentials = {
        region:'eu',
        refresh_token: data.meta.spapi_oauth_code, 
        credentials:{
          SELLING_PARTNER_APP_CLIENT_ID: this.configService.get('AMAZON_SELLING_PARTNER_APP_CLIENT_ID'), 
          SELLING_PARTNER_APP_CLIENT_SECRET: this.configService.get('AMAZON_SELLING_PARTNER_APP_CLIENT_SECRET')
        }
      }
      const encryptedData = this.encryptData(credentials);
      paylaod['meta'] = encryptedData;
      paylaod['status'] = MarketplaceAccountsStatus.ACTIVE;
      paylaod['apiAccess'] = true;
      const credPayload = {
        credentials: credentials,
        accountId: marketplaceAccount.accountId,
        marketplaceAccountId: marketplaceAccount.id,
        clientId: marketplaceAccount.organizationId,
        organizationId: marketplaceAccount.organizationId,
        credType: marketplaceAccount.marketplace
      }
      this.credentialsService.create(credPayload);
    }
    return this.updateById(marketplaceAccount.id, paylaod);
  }

  private encryptData(data: any): string {
    return this.encryptionService.encrypt(JSON.stringify(data));
  }

    async processCreds(type, data) {
    try {
      if (type === 'encrypt') data.meta = JSON.stringify(data.credentials);
      data.meta = this.encryptionService[type](data.credentials)
      if (type === 'decrypt') data.credentials = JSON.parse(data.credentials);
    } catch (err) {

    }
  }
}
