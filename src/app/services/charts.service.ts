import { Injectable } from '@angular/core';

import { RecordsService } from './records.service';
import { CategoriesService } from './categories.service';


@Injectable()
export class ChartsService {

  constructor(private recordsService: RecordsService, private categoriesService: CategoriesService) { }

  getChartCategories(): Promise<any> {
    let records: Array<any>;
    let categories: Object;

    let categoriesKeys: Array<any>;
    let chartCategories: Array < any > =[];

    return this.categoriesService.getAll()
      .then((data) => {
        categories = data;
        categoriesKeys = Object.keys(categories);

        return this.recordsService.getAll()
      })
      .then((data) => {
        records = data;
        for (let i = 0; i < records.length; i++) {
          let categoryRecord = records[i].category;
          for (let j = 0; j < categoriesKeys.length; j++) {
            let categoryKey = categoriesKeys[j]
            if (categoryRecord === categoryKey) {

              if (chartCategories.includes(categories[categoryKey])) {
                categories[categoryKey].count++;
              } else {
                categories[categoryKey].count = 1;
                chartCategories.push(categories[categoryKey])
              }
            }
          }
        }
        return chartCategories;
      });
  }

}
