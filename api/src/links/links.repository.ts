import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

interface QueryResult {
  affectedRows: number;
}

interface CountResult {
  count: number;
}

@Injectable()
export class LinksRepository {
  constructor(private sequelize: Sequelize) {}

  async findAll(): Promise<any[]> {
    const sql = 'SELECT * FROM links';
    const [results] = await this.sequelize.query(sql);
    return results;
  }

  async findById(id: number): Promise<any> {
    const sql = 'SELECT * FROM links WHERE id = :id';
    const [results] = await this.sequelize.query(sql, {
      replacements: { id },
    });
    return results.length ? results[0] : null;
  }

  async create(
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    const sql = `
      INSERT INTO links (ku1live, ku2live, ku5live, created_at, updated_at)
      VALUES (:ku1live, :ku2live, :ku5live, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
    const [result] = await this.sequelize.query(sql, {
      replacements: { ku1live, ku2live, ku5live },
    });
    return result;
  }

  async update(
    id: number,
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    // Check if the record exists
    const existingRecord = await this.findById(id);
    if (!existingRecord) {
      throw new NotFoundException(`No link found with id ${id}`);
    }

    // If record exists, perform the update
    const updateSql = `
      UPDATE links
      SET ku1live = :ku1live, ku2live = :ku2live, ku5live = :ku5live, updated_at = CURRENT_TIMESTAMP
      WHERE id = :id
    `;
    const [result] = await this.sequelize.query(updateSql, {
      replacements: { id, ku1live, ku2live, ku5live },
    });

    return result;
  }

  async delete(id: number): Promise<any> {
    const sql = 'DELETE FROM links WHERE id = :id';
    const [result] = await this.sequelize.query(sql, {
      replacements: { id },
    });
    return result;
  }
}
