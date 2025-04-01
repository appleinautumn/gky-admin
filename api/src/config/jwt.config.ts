import { Logger } from '@nestjs/common';

const logger = new Logger('JwtConfig');

/**
 * JWT configuration that ensures consistent JWT secret usage across the application
 */
export const jwtConfig = {
  // The secret key used for JWT tokens - use environment variable or fallback to default
  secret: process.env.JWT_SECRET || 'your-secret-key',

  // Token expiration time in seconds
  expiresIn: '24h',

  // Log configuration (but don't expose the actual secret)
  logConfig: () => {
    logger.log(
      `JWT configuration loaded: SECRET=${process.env.JWT_SECRET ? '[from env]' : '[default]'}`,
    );
  },
};

// Log during module loading
jwtConfig.logConfig();
