import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);

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
    const result = await this.linksRepository.create(ku1live, ku2live, ku5live);

    // Update HTML files with new URLs
    await this.updateHtmlFile('ku1live', ku1live);
    await this.updateHtmlFile('ku2live', ku2live);
    await this.updateHtmlFile('ku5live', ku5live);

    return result;
  }

  async updateLink(
    id: number,
    ku1live: string,
    ku2live: string,
    ku5live: string,
  ): Promise<any> {
    const result = await this.linksRepository.update(
      id,
      ku1live,
      ku2live,
      ku5live,
    );

    // Update HTML files with new URLs
    await this.updateHtmlFile('ku1live', ku1live);
    await this.updateHtmlFile('ku2live', ku2live);
    await this.updateHtmlFile('ku5live', ku5live);

    return result;
  }

  async deleteLink(id: number): Promise<any> {
    return this.linksRepository.delete(id);
  }

  /**
   * Updates HTML file with the new URL
   * @param filePrefix The prefix for the file (ku1live, ku2live, ku5live)
   * @param url The new URL to set
   */
  private async updateHtmlFile(filePrefix: string, url: string): Promise<void> {
    try {
      // Get base directory from environment variable or use default
      const baseDir = process.env.HTML_FILES_PATH || '/var/www';
      const filePath = path.join(baseDir, filePrefix, 'index.html');

      // Create HTML content with the new URL
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${url}">
    <title>Redirecting...</title>
</head>
<body>
    <p>If you are not redirected, <a href="${url}">click here</a>.</p>
</body>
</html>`;

      // Ensure directory exists
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        this.logger.warn(
          `Directory ${dirPath} does not exist. Attempting to create it.`,
        );
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          this.logger.log(`Created directory: ${dirPath}`);
        } catch (mkdirError) {
          this.logger.error(
            `Failed to create directory ${dirPath}: ${mkdirError.message}`,
          );
          return;
        }
      }

      // Write to file
      fs.writeFileSync(filePath, htmlContent);
      this.logger.log(`Updated HTML file at ${filePath} with URL: ${url}`);
    } catch (error) {
      this.logger.error(
        `Failed to update HTML file for ${filePrefix}: ${error.message}`,
      );
      // Not throwing error to prevent API from failing if file update fails
    }
  }
}
