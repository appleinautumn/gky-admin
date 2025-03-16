import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LivesService } from './lives.service';

@Controller('lives')
export class LivesController {
  constructor(private readonly livesService: LivesService) {}

  @Get()
  async getAll() {
    return this.livesService.getAllLives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.livesService.getLiveById(id);
  }

  @Post()
  async create(
    @Body('ku1live') ku1live: string,
    @Body('ku2live') ku2live: string,
    @Body('ku5live') ku5live: string,
  ) {
    return this.livesService.createLive(ku1live, ku2live, ku5live);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('ku1live') ku1live: string,
    @Body('ku2live') ku2live: string,
    @Body('ku5live') ku5live: string,
  ) {
    return this.livesService.updateLive(id, ku1live, ku2live, ku5live);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.livesService.deleteLive(id);
  }
}
