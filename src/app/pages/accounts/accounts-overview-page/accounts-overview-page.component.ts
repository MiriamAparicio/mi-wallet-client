import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-overview-page',
  templateUrl: './accounts-overview-page.component.html',
  styleUrls: ['./accounts-overview-page.component.css']
})
export class AccountsOverviewPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  
  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
