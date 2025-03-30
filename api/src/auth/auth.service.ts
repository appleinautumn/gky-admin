import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
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
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
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
