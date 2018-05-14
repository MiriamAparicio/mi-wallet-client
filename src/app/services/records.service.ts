import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecordsService {

  public types = ['Income', 'Expense'];

  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

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
      .toPromise();
  }

}
