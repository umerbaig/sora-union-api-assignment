import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DataService } from './data.service';
import { IData } from './interfaces/data.interface';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getData(@Query('sort_by') query: string): Promise<IData[]> {
    if (query === 'asc' || query === 'desc' || query === 'created_at') {
      return await this.dataService.getData(query);
    }
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
