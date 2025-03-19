import { ValidationPipe, BadRequestException } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        const messages = errors.map(error => 
          Object.values(error.constraints || {})
        ).flat();
        
        return new BadRequestException({
          error: {
            message: messages,
            details: errors.map(error => ({
              field: error.property,
              constraints: error.constraints,
            })),
          },
        });
      },
    });
  }
} 