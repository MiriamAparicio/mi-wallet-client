import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountsService {

  private accounts;
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/accounts`, options)
      .toPromise();
  }
   
  getOne(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/accounts/${id}`, options)
      .toPromise();
  }

  getRecords(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/accounts/${id}/records`, options)
      .toPromise();
  }

  create(account: Object): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/accounts`, account, options)
      .toPromise();
  }

  computeBalance(start: number, records: Array<any>): number {
    let balance = start;
    for (let i = 0; i < records.length; i++){
      if (records[i].type === "expense") {
        balance -= records[i].amount;
      } else {
        balance +=records[i].amount;
      }
    }
    return balance;
  }
}
