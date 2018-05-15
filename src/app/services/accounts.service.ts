import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountsService {

  private baseUrl = 'http://localhost:3000';

  private ready: Promise<any>;
  private accounts = {};

  constructor(
    // private recordService: RecordService,
    private httpClient: HttpClient
  ) {

    this.ready = this.loadAll();

    // this.recordService.newRercord$.subscribe((record) => {
    //  this.accounts[record.account].balance += record.amount;
    // })

   }


  private loadAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/accounts`, options)
      .toPromise()
      .then((accounts: Array<any>) => {
        accounts.forEach((account) => {
          this.accounts[account._id] = account;
        })
        return accounts;
      })
  }

  getAll(): Promise<any> {
    return this.ready.then(() => {
      return Object.values(this.accounts);
    });
  }

  getOne(id): Promise<any> {
    // const options = {
    //   withCredentials: true
    // };
    // return this.httpClient.get(`${this.baseUrl}/accounts/${id}`, options)
    //   .toPromise();
    return this.ready.then(() => this.accounts[id]);
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
      .toPromise()
      .then((account:any) => this.accounts[account._id] = account);
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
