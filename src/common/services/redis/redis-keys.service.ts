import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CanRedisKeysService {
  private env: string = this.configService.get('REDIS_ENV');

  constructor(private configService: ConfigService) {}


  userKey(user: Record<string, any>) {
    return `gnm::${this.env}::user::${user.email}`;
  }

  appUserKey(user: Record<string, any>, app: Record<string, any>) {
    return `gnm::${this.env}::user::${user.type}::${user.email}::app::${app.name || app.appName}`;
  }

  userTokenKey(userId: number) {
    return `can:${this.env}:gnm:${userId}:refresh_token`;
  }

}