import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConfig } from '../config/jwt.config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
    this.logger.log('JwtStrategy initialized with config from jwt.config.ts');
  }

  // Add request parameter to see headers
  async validate(request: Request, payload: any) {
    this.logger.log('=============== JWT VALIDATION ===============');
    this.logger.log(`Auth header: ${request.headers.authorization}`);
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);

    try {
      // Check if email exists in payload
      if (!payload.email) {
        this.logger.error('Email missing from JWT payload');
        throw new UnauthorizedException('Invalid token structure');
      }

      this.logger.log(`Looking up user by email: ${payload.email}`);
      const user = await this.usersService.findByEmail(payload.email);

      if (!user) {
        this.logger.error(`User not found for email: ${payload.email}`);
        throw new UnauthorizedException('User not found');
      }

      this.logger.log(`User found: ${user.email} (ID: ${user.id})`);
      return user;
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      this.logger.error(`Stack trace: ${error.stack}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
