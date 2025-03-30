import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { LivesService } from './lives.service';
import { UpdateLiveDto } from './dto/update-live.dto';

@Controller('lives')
export class LivesController {
  constructor(private readonly livesService: LivesService) {}

  @Get()
  async getAll() {
    return this.livesService.getAllLives();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLiveDto: UpdateLiveDto,
  ) {
    // If validation passes, proceed with the update
    return this.livesService.updateLive(
      id,
      updateLiveDto.ku1live,
      updateLiveDto.ku2live,
      updateLiveDto.ku5live,
    );
  }
}
