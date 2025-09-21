import {
  ICanDatasourceConfig,
  ICanDatasourceConfigAttributes,
} from "./datasource.config.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MODELS } from "src/include.models";

@Injectable()
export class CanDataSourceConfig implements ICanDatasourceConfig {
  constructor(private configService: ConfigService) {
    console.log("Node Environment : ", this.configService.get("NODE_ENV"));
  }
  /**
   * Extract Database Configuration from Environment File
   */
  get dataSourceConfiguration(): ICanDatasourceConfigAttributes {
    let pool_size: number = this.configService.get("POOL_SIZE") || 5;
    return {
      dialect: this.configService.get("DB_DIALECT") as any,
      host: this.configService.get("DB_HOST"),
      port: this.configService.get<number>("DB_PORT"),
      username: this.configService.get("DB_USER"),
      password: this.configService.get("DB_PASS"),
      database: this.configService.get("DB_NAME"),
      // logging: this.configService.get("DB_LOGS") == "true",
      sync: { alter: this.configService.get("DB_SYNC_ALTER") === "true" },
      models: [...MODELS],
      pool: {
        max: Number(pool_size),
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Set to true in production with a proper cert
        },
      },
    };
  }
}
