import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {

  @Input() record: Object;
  @Input() categories: Object;


  constructor() { }

  ngOnInit() {
  }

}
