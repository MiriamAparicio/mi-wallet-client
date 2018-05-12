import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-record-create-page',
  templateUrl: './record-create-page.component.html',
  styleUrls: ['./record-create-page.component.css']
})
export class RecordCreatePageComponent implements OnInit {

  feedbackEnabled: boolean;
  error: string;
  processing: boolean;

  accounts: Array<any>;
  categories: Object;
  categoriesKeys: Array<any>;

  category: String;
  amount: number;
  date: Date;
  account: String;
  type: String;

  constructor (
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService) { }

  ngOnInit() {

    this.accountsService.getAll()
      .then((data) => {
        this.accounts = data;
      });

    this.categoriesService.getAll()
      .then((data) => {
        this.categories = data;
        this.categoriesKeys = Object.keys(this.categories);
      });

    

  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }

}
