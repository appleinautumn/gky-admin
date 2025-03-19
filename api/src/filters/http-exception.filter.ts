import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // If the exception response is already formatted as we want, use it directly
    if (typeof exceptionResponse === 'object' && 'error' in exceptionResponse) {
      response.status(status).json(exceptionResponse);
      return;
    }

    // Otherwise, format it
    response.status(status).json({
      error: {
        message: typeof exceptionResponse === 'object' 
          ? (exceptionResponse as any).message || 'An error occurred'
          : exceptionResponse,
      },
    });
  }
} 