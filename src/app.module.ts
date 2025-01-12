import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivesModule } from './lives/lives.module';

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
    }),
    LivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
