import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { AccountsService } from '../../../services/accounts.service';
import { RecordsService } from '../../../services/records.service';

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
  types: Array<String>;

  category: String;
  amount: number;
  date: Date;
  account: any;
  type: String;

  constructor (
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private recordsService: RecordsService) { }

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

    this.types = this.recordsService.types;
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      const record = {
        category: this.category,
        amount: this.amount,
        date: this.date,
        account: this.account,
        type: this.type
      }
      this.recordsService.create(record)
        .then((result) => {
          this.router.navigate(['/accounts/overview']);
        })
        .catch((err) => {
          this.error = err.error.code; // :-)
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }

}
