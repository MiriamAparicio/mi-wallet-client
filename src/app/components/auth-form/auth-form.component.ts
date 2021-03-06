import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  @Input() feedbackEnabled: boolean;
  @Input() processing: boolean;
  @Input() authMode: any;

  useremail: String;
  password: String;

  @Output() invalid: EventEmitter<any> = new EventEmitter();
  @Output() submitData: EventEmitter<any> = new EventEmitter();

  constructor (private router: Router) { }

  ngOnInit() {
  }

  submitForm (form) {
    if (form.valid) {
      const user = {
        useremail: this.useremail,
        password: this.password
      }
      this.submitData.emit(user);
    }
    else {
      this.invalid.emit();
    }
  }

}
