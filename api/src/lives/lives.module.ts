import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LivesController } from './lives.controller';
import { LivesService } from './lives.service';
import { Lives } from './lives.model';
import { LivesRepository } from './lives.repository';

@Module({
  imports: [SequelizeModule.forFeature([Lives])],
  controllers: [LivesController],
  providers: [LivesService, LivesRepository],
})
export class LivesModule {}
