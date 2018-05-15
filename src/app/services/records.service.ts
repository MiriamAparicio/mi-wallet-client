import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecordsService {

  public types = ['Income', 'Expense'];

  private baseUrl = 'http://localhost:3000';

  private newRecord: Subject<any> = new Subject();
  newRecord$: Observable<any> = this.newRecord.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/records`, options)
      .toPromise();
  }

  getLatest(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/records/latest`, options)
      .toPromise();
  }

  create(record: Object): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/records`, record, options)
      .toPromise()
      .then(result => { 
        this.newRecord.next(record); 
        return result;
      })
  }

  
}
