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
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  private readonly logger = new Logger(LinksController.name);

  constructor(private readonly linksService: LinksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Request() req) {
    this.logger.log('Authenticated request to getAll()');
    this.logger.log(`User: ${JSON.stringify(req.user)}`);
    return this.linksService.getAllLinks();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
    @Request() req,
  ) {
    this.logger.log(`Authenticated request to update() for id: ${id}`);
    this.logger.log(`User: ${JSON.stringify(req.user)}`);
    // If validation passes, proceed with the update
    return this.linksService.updateLink(
      id,
      updateLinkDto.ku1live,
      updateLinkDto.ku2live,
      updateLinkDto.ku5live,
    );
  }
}
