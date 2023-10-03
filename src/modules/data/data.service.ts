import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { customAscendingSort } from '../../../utils/sorting/ascending';
import { customDescendingSort } from '../../../utils/sorting/descending';
import { IData } from './interfaces/data.interface';

@Injectable()
export class DataService {
  async getData(query: string): Promise<IData[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      const path = process.cwd() + '/files/data.csv';
      fs.createReadStream(path)
        .pipe(csv({ separator: ';', headers: ['date', 'value'] }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
          if (query === 'asc') {
            results.sort(customAscendingSort);
          }
          if (query === 'desc') {
            results.sort(customDescendingSort);
          }
          if (query === 'created_at') {
            results.sort((a, b) => a['date'] - b['date']);
          }
          resolve(results);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
