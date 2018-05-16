import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AccountsService } from '../../../services/accounts.service';
import { RecordsService } from '../../../services/records.service';
import { CategoriesService } from '../../../services/categories.service';
import { ChartsService } from '../../../services/charts.service';

import { Chart } from 'chart.js/src/chart.js';


@Component({
  selector: 'app-accounts-overview-page',
  templateUrl: './accounts-overview-page.component.html',
  styleUrls: ['./accounts-overview-page.component.css']
})
export class AccountsOverviewPageComponent implements OnInit {

  accounts: Array<any>;
  categories: Object;
  allRecords: Array<any>;
  latestRecords: Array<any>;
  totalBalance: number;
  // accountBalance: number = 1025;

  myChart: Object;
  categoriesChart: Array<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private recordsService: RecordsService,
    private chartsService: ChartsService) {
      
    this.latestRecords = [];
    this.accounts = [];
    this.myChart = [];
    
  }

  ngOnInit() {
    
    this.accountsService.totalBalanceChange$.subscribe((totalBalance) => {
      this.totalBalance = totalBalance;
    });
    

    this.accountsService.getAll()
      .then((data) => {
        this.accounts = data;    
      });

    this.categoriesService.getAll()
      .then((data) => {
        this.categories = data;
      });

    this.recordsService.getAll()
      .then((data) => {
        this.allRecords = data;
      });

    this.recordsService.getLatest()
      .then((data) => {
        this.latestRecords = data;
      });

    this.chartsService.getChartCategories()
    .then((result) => {
      this.categoriesChart = result;
      let categoriesLabelList: Array < any >= [];
      let categoriesCountList: Array < any >= [];
      let categoriesColorList: Array < any >= [];

      for (let i = 0; i < this.categoriesChart.length; i++){
        categoriesLabelList.push(this.categoriesChart[i].label);
        categoriesCountList.push(this.categoriesChart[i].count);
        categoriesColorList.push(this.categoriesChart[i].color);
      }
      this.myChart = new Chart('categoryChart', {
        type: 'doughnut',
        data: {
          labels: categoriesLabelList,
          datasets: [{
            label: '# of Categories',
            data: categoriesCountList,
            backgroundColor: categoriesColorList,
            borderColor: categoriesColorList,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            // yAxes: [{
            //   ticks: {
            //     beginAtZero: true
            //   }
            // }]
          }
        }
      });
    })    
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
