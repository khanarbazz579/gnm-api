import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from "./core/core.module";
import { ApisModule } from "./apis/apis.module";
import { CanCommonModule } from "@can/common";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { CommonModule } from "./common/common.module";
import { CronModule } from "./common/cron/cron.module";

@Module({
  imports: [
    CoreModule,
    ApisModule,
    CanCommonModule,
    CommonModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5000,
    }),
    CronModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
