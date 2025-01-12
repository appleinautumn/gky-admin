import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Lives } from './lives/lives.model';
import { LivesModule } from './lives/lives.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.DEV_DB_STORAGE, // Use the storage path from environment variables
      // models: [__dirname + '/**/*.model.ts'],
      models: [Lives],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
    }),
    LivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
