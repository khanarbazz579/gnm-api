import { Inject } from '@nestjs/common';
import { CountOptions, FindOptions, UpdateOptions } from 'sequelize/types';
import { CREDENTIALS_REPOSITORY } from './credentials.repository';
import { Credentials } from './credentials.model';
import { CredentialsDto } from './credentials.dto';
import { EncryptionService } from 'src/common/services/encryption/encryption.service';

export class CredentialsService {
  constructor(
    @Inject(CREDENTIALS_REPOSITORY) private readonly credentialsRepository: typeof Credentials, 
      private encryptionService: EncryptionService
  ) { }

  async findAll(filter: FindOptions, decrypt = 'false') {
    const data = await this.credentialsRepository.findAll(filter);
    if (decrypt === 'true') {
      for (const ele of data) {
        this.processCreds('decrypt', ele);
      }
    }
    return data;
  }

  async create(credentials): Promise<CredentialsDto> {
    this.processCreds('encrypt', credentials);
    return this.credentialsRepository.create<Credentials>(credentials);
  }

  async findById(id: number, decrypt = 'false') {
    const data = await this.credentialsRepository.findByPk(id);
    if (decrypt === 'true') this.processCreds('decrypt', data);
    return data;
  }
  async updateById(id: number, data: CredentialsDto) {
    this.processCreds('encrypt', data);
    return this.credentialsRepository.update(data, { where: { id } });
  }

  async count(options: CountOptions) {
    return this.credentialsRepository.count(options);
  }

  async update(data: CredentialsDto, filter: UpdateOptions) {
    this.processCreds('encrypt', data);
    return await this.credentialsRepository.update(data, filter);
  }

  async processCreds(type, data) {
    try {
      if (type === 'encrypt') data.credentials = JSON.stringify(data.credentials);
      data.credentials = this.encryptionService[type](data.credentials)
      if (type === 'decrypt') data.credentials = JSON.parse(data.credentials);
    } catch (err) {

    }
  }

}
