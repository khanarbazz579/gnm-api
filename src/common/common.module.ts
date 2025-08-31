import { CanAwsModule } from '@can/aws';
import { Module, forwardRef } from '@nestjs/common';
import { OtpService } from './services/otp/otp.service';
import { QueryService } from './services/query/query.service';
import { CanDatasourceModule } from 'src/core/datasource/datasource.module';
import { SmsService } from './services/sms/sms.service';
import { ApiService } from './services/api/api.service';
import { CsvParserService } from './services/csv-parser/csv-parser.service';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from './services/redis/redis.module';
import { CommonService } from './common.service';
import { CoreModule } from 'src/core/core.module';
import { EncryptionService } from './services/encryption/encryption.service';

@Module({
  imports: [
    CanAwsModule.forRoot({
      type: 'profile',
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION,
    }),
    HttpModule,
    CanDatasourceModule,
    forwardRef(() => CoreModule),
    forwardRef(() => RedisModule)
  ],
  providers: [OtpService, QueryService, SmsService, ApiService, CsvParserService, CommonService, EncryptionService],
  exports: [CanAwsModule, HttpModule, OtpService, QueryService, SmsService, ApiService, CsvParserService, CommonService, EncryptionService],
})
export class CommonModule { }
