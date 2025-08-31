import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class CanRedisService {
  private redisConfig;
  private client;

  constructor(private configService: ConfigService) {
    this.redisConfig = {
      host: this.configService.get('REDIS_HOST_URL'),
      port: this.configService.get('REDIS_PORT'),
      no_ready_check: this.configService.get('REDIS_NO_READY_CHECK'),
      auth_pass: this.configService.get('REDIS_PASSWORD'),
    };
    this.createRedisClient(this.redisConfig);
  }

  async createRedisClient(redisConfig: any) {
    this.client = createClient({
      password: redisConfig['auth_pass'],
      socket: {
        host: redisConfig['host'],
        port: redisConfig['port'],
      },
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    await this.client.connect();
  }

  async get(key: string) {
    const data = await this.client.get(key);
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log('Redis fetch error', error);
    }
  }

  async getArray(keyArr) {
    let resObj = {};
    for (let index = 0; index < keyArr.length; index++) {
      resObj[keyArr[index]] = JSON.parse(await this.client.get(keyArr[index]));
    }
    return resObj;
  }
  /**
   * function to set redis key . Send expiry in days
   * @param key
   * @param value
   * @param expiry
   */

  set(key: string, value: any, expiry = 30) {
    if (expiry && isNaN(expiry)) {
      this.client.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24 * expiry);
    } else {
      this.client.set(key, JSON.stringify(value));
    }
  }

  async delCache(key: string) {
    return await this.client.del(key);
  }

  setWithExpiryTime(key: string, value: any, expiry:any = 30) {  // expiry should be in minuts
    if (expiry && !isNaN(expiry)) {
      this.client.set(key, JSON.stringify(value), { EX: expiry*60 });
    } else {
      this.client.set(key, JSON.stringify(value));
    }
  }
}
