import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import 'moment-timezone';
import { CanLogger } from 'src/core/logger/logger.service';

let tasksQueueAdderCronRunning = false;

@Injectable()
export class CronService {
  constructor(
    private canLogger: CanLogger
  ) {
    // Initialize Logger
    this.canLogger.setContext('Cron');
  }



}