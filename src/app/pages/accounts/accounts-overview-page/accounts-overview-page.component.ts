import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { RecordsService } from '../../../services/records.service';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-accounts-overview-page',
  templateUrl: './accounts-overview-page.component.html',
  styleUrls: ['./accounts-overview-page.component.css']
})
export class AccountsOverviewPageComponent implements OnInit {

  accounts: Array<any>;
  categories: Object;
  latestRecords: Array<any>;
  totalBalance: number;
  accountBalance: number = 1025;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private recordsService: RecordsService) {   

    this.totalBalance = 2015;
    this.latestRecords = [];
    this.accounts = [];
    }

  ngOnInit() {
    this.accountsService.getAll()
      .then((data) =>{
        this.accounts = data;
        // calculating total balance
        // let accountRecords = [];
        // let accountTotal = 0;
        // for (let i = 0; i < this.accounts.length; i++){
        //   this.accountsService.getRecords(this.accounts[i]._id)
        //   .then((data) => {
        //     accountRecords = data;
        //     accountTotal = this.accountsService.computeBalance(accountTotal, accountRecords);
        //     this.totalBalance += accountTotal;
        //   })
        // }
      });
      
      this.categoriesService.getAll()
      .then((data) => {
        this.categories = data;
      });
      
      this.recordsService.getLatest()
      .then((data) => {
        this.latestRecords = data;
      });
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
