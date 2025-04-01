import { Injectable } from '@nestjs/common';

import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  async getAllLinks(): Promise<any[]> {
    return this.linksRepository.findAll();
  }

  async getLinkById(id: number): Promise<any> {
    return this.linksRepository.findById(id);
  }

  async createLink(
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    return this.linksRepository.create(ku1live, ku2live, ku5live);
  }

  async updateLink(
    id: number,
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    return this.linksRepository.update(id, ku1live, ku2live, ku5live);
  }

  async deleteLink(id: number): Promise<any> {
    return this.linksRepository.delete(id);
  }
}
