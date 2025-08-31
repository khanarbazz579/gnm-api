import { CanAwsModule } from '@can/aws';
import { forwardRef, Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { CanDatasourceModule } from 'src/core/datasource/datasource.module';
import { ApiService } from '../api/api.service';

import { CanRedisKeysService } from './redis-keys.service';
import { CanRedisService } from './redis.service';

@Module({
  imports: [
    forwardRef(() => CommonModule),
  ],
  providers: [ 
    CanRedisService ,
    CanRedisKeysService,
    
  ],
  exports: [ CanRedisService ,CanRedisKeysService],
})
export class RedisModule {}
