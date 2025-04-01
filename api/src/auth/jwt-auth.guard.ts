import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.log('=============================================');
    this.logger.log(`JWT Guard checking request to: ${request.url}`);
    this.logger.log(`Authorization header: ${request.headers.authorization}`);

    // Try to extract token manually
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      this.logger.log(`Token found: ${token.substring(0, 20)}...`);
    } else {
      this.logger.warn('No valid authorization header found');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      this.logger.error(`Error during authentication: ${err.message}`);
      throw err;
    }

    if (info) {
      this.logger.warn(`Auth info: ${JSON.stringify(info)}`);
    }

    if (!user) {
      this.logger.error('User not found in JWT payload');
      throw new UnauthorizedException('Authentication required');
    }

    this.logger.log(`Successfully authenticated user: ${user.email}`);
    return user;
  }
}
