import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Query } from './common/services/query/query';
import { QueryService } from './common/services/query/query.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => QueryService))
    private queryService: QueryService
  ) { }
  root(): string {
    return `Hello From Cantech: ${new Date().toDateString()}`;
  }

  async healthCheck() {
    try {
      const dbCheck = await this.queryService.executeQuery<any[]>(Query.dbHealthCheck());
      return {
        "statusCode": 200,
        "data": dbCheck,
        "message": "Success",
        "fieldErrors": [],
        "error": false
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message)
    }
  }
}
