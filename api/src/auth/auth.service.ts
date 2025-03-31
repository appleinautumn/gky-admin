import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UsersService) private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    // Check that usersService is defined during construction
    if (!this.usersService) {
      console.error(
        'UsersService is not injected properly in AuthService constructor',
      );
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Attempting to validate user: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      this.logger.log(`User validated successfully: ${email}`);
      const { password, ...result } = user.toJSON();
      return result;
    }
    this.logger.warn(`Failed to validate user: ${email}`);
    return null;
  }

  async login(email: string, password: string) {
    this.logger.log(`Login attempt for: ${email}`);
    const user = await this.validateUser(email, password);
    if (!user) {
      this.logger.warn(`Login failed for: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    this.logger.log(`Creating token with payload: ${JSON.stringify(payload)}`);
    this.logger.log(
      `JWT Secret: ${process.env.JWT_SECRET || 'your-secret-key'}`,
    );

    const token = this.jwtService.sign(payload);
    this.logger.log(`Generated token: ${token}`);

    return {
      access_token: token,
      user,
    };
  }

  async register(userData: RegisterDto) {
    if (!this.usersService) {
      throw new Error('UsersService is not available in AuthService');
    }

    // Use direct call to UsersService
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      });

      const { password, ...result } = user.toJSON();
      return result;
    } catch (error) {
      throw new BadRequestException('Could not create user');
    }
  }
}
