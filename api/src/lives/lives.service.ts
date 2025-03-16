import { Injectable } from '@nestjs/common';

import { LivesRepository } from './lives.repository';

@Injectable()
export class LivesService {
  constructor(private readonly livesRepository: LivesRepository) {}

  async getAllLives(): Promise<any[]> {
    return this.livesRepository.findAll();
  }

  async getLiveById(id: number): Promise<any> {
    return this.livesRepository.findById(id);
  }

  async createLive(
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    return this.livesRepository.create(ku1live, ku2live, ku5live);
  }

  async updateLive(
    id: number,
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    return this.livesRepository.update(id, ku1live, ku2live, ku5live);
  }

  async deleteLive(id: number): Promise<any> {
    return this.livesRepository.delete(id);
  }
}
