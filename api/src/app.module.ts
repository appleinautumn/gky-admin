import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { Links } from './links/links.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === 'true',
      synchronize: false,
      models: [User, Links],
    }),
    UsersModule,
    LinksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
