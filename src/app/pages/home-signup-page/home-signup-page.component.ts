import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-signup-page',
  templateUrl: './home-signup-page.component.html',
  styleUrls: ['./home-signup-page.component.css']
})
export class HomeSignupPageComponent implements OnInit {

  feedbackEnabled = false;
  error = null;
  processing = false;
  authMode: String = "Signup";

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  handleSubmitForm (user) {
    this.authService.signup(user)
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
