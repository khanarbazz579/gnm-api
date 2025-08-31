import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { CanContextService } from "@can/common";
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    try {
      response.status(500).json({
        message: exception.message,
        stack: exception.stack,
        name: exception.name,
        ...exception,
      });
    } catch (error) {
      response.status(500).json({
        message: error.message,
        stack: error.stack,
        name: error.name,
        ...error,
      });
    }
  }
}
