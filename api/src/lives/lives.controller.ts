import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Logger,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateLiveDto } from './dto/update-live.dto';
import { LivesService } from './lives.service';

@Controller('lives')
export class LivesController {
  private readonly logger = new Logger(LivesController.name);

  constructor(private readonly livesService: LivesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Request() req) {
    this.logger.log('Authenticated request to getAll()');
    this.logger.log(`User: ${JSON.stringify(req.user)}`);
    return this.livesService.getAllLives();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLiveDto: UpdateLiveDto,
    @Request() req,
  ) {
    this.logger.log(`Authenticated request to update() for id: ${id}`);
    this.logger.log(`User: ${JSON.stringify(req.user)}`);
    // If validation passes, proceed with the update
    return this.livesService.updateLive(
      id,
      updateLiveDto.ku1live,
      updateLiveDto.ku2live,
      updateLiveDto.ku5live,
    );
  }
}
