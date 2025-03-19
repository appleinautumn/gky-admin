import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const result = await this.authService.login(email, password);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          error: {
            message: error.message,
          },
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) userData: RegisterDto) {
    try {
      const result = await this.authService.register(userData);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          error: {
            message: error.message,
          },
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 