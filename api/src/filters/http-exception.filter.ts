import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : exception;

    // Handle NestJS default exception format
    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      response.status(status).json({
        error: {
          message: exceptionResponse.message,
        },
      });
      return;
    }

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