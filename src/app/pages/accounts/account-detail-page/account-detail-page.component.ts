import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountsService } from '../../../services/accounts.service';
import { CategoriesService } from '../../../services/categories.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-account-detail-page',
  templateUrl: './account-detail-page.component.html',
  styleUrls: ['./account-detail-page.component.css']
})
export class AccountDetailPageComponent implements OnInit {

  account:Object;
  idAccount: String;
  categories: Object;
  records: Array<any>;
  accountBalance: number = 450;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService) { }

  ngOnInit() {

    this.route.params
      .subscribe((params) => {
        this.idAccount = params.id;
        this.accountsService.getOne(this.idAccount)
          .then((data) => {
            this.account = data;
          });
      });

    this.categoriesService.getAll()
      .then((data) => {
        this.categories = data;
      });

    this.accountsService.getRecords(this.idAccount)
    .then((data) => {
      this.records = data;
    });
    
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}