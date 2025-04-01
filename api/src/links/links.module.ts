import { Module, Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { LinksController } from './links.controller';
import { Links } from './links.model';
import { LinksRepository } from './links.repository';
import { LinksService } from './links.service';

const logger = new Logger('LinksModule');
logger.log('Initializing LinksModule with AuthModule integration');

@Module({
  imports: [SequelizeModule.forFeature([Links]), AuthModule],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
})
export class LinksModule {}
