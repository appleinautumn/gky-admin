import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Enable all log levels
  });

  // Log environment variables (except sensitive ones)
  logger.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  // Force JWT secret to a consistent value for testing
  process.env.JWT_SECRET = 'your-secret-key';
  logger.log(`JWT_SECRET forced to: ${process.env.JWT_SECRET}`);

  // Enable CORS
  app.enableCors();

  // Apply the exception filter globally
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply the transform interceptor globally
  app.useGlobalInterceptors(new TransformInterceptor());

  // Apply custom validation pipe globally
  app.useGlobalPipes(new CustomValidationPipe());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
