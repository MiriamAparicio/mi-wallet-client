import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css']
})
export class AccountCardComponent implements OnInit {

  @Input() account: Object;
  @Input() accountBalance: number;

  constructor() { }

  ngOnInit() {
  }

}
