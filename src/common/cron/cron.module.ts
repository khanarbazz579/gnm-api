import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from '../common.module';
import { CronService } from './cron.service';
import { CanLoggerModule } from 'src/core/logger/logger.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    CanLoggerModule
  ],
  providers: [CronService],
  exports: [ScheduleModule],
})
export class CronModule { }
