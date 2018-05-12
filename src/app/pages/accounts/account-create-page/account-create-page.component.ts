import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AccountsService } from '../../../services/accounts.service';


@Component({
  selector: 'app-account-create-page',
  templateUrl: './account-create-page.component.html',
  styleUrls: ['./account-create-page.component.css']
})
export class AccountCreatePageComponent implements OnInit {

  feedbackEnabled: boolean;
  error: string;
  processing: boolean;
  accountName: String;
  

  constructor (
    private authService: AuthService,
    private router: Router,
    private accountsService: AccountsService) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      const account = {
        name: this.accountName
      }
      this.accountsService.create(account)
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
