import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-login-page',
  templateUrl: './home-login-page.component.html',
  styleUrls: ['./home-login-page.component.css']
})
export class HomeLoginPageComponent implements OnInit {

  feedbackEnabled = false;
  error = null;
  processing = false;
  authMode:String = "Login";

  constructor (
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  submitData (user) {
      this.authService.login(user)
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
