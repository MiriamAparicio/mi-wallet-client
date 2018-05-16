import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecordsService {

  public types = ['Income', 'Expense'];

  private apiUrl = environment.apiUrl + '/records';

  private newRecord: Subject<any> = new Subject();
  newRecord$: Observable<any> = this.newRecord.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/`, options)
      .toPromise();
  }

  getLatest(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/latest`, options)
      .toPromise();
  }

  create(record: Object): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/`, record, options)
      .toPromise()
      .then(result => { 
        this.newRecord.next(record); 
        return result;
      })
  }
  
}
