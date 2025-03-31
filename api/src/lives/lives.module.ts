import { Module, Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { LivesController } from './lives.controller';
import { Lives } from './lives.model';
import { LivesRepository } from './lives.repository';
import { LivesService } from './lives.service';

const logger = new Logger('LivesModule');
logger.log('Initializing LivesModule with AuthModule integration');

@Module({
  imports: [SequelizeModule.forFeature([Lives]), AuthModule],
  controllers: [LivesController],
  providers: [LivesService, LivesRepository],
})
export class LivesModule {}
