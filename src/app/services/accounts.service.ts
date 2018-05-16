import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { RecordsService } from './records.service';

@Injectable()
export class AccountsService {

  private baseUrl = 'http://localhost:3000/accounts';

  private ready: Promise<any>;
  private accounts = {};

  private totalBalanceChange: Subject<any> = new Subject();
  totalBalanceChange$: Observable<any> = this.totalBalanceChange.asObservable();


  constructor (
    private recordService: RecordsService,
    private httpClient: HttpClient
  ) {

    this.ready = this.loadAll();

    this.recordService.newRecord$.subscribe((record) => {
      this.accounts[record.account].balance += record.amount;
      this.computeBalance();
    })
  }

  private loadAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/`, options)
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
      this.computeBalance();
      return Object.values(this.accounts);
    });
  }

  getOne(id): Promise<any> {
    return this.ready.then(() => this.accounts[id]);
  }

  getRecords(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/${id}/records`, options)
      .toPromise();
  }

  create(account: Object): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/`, account, options)
      .toPromise()
      .then((account: any) => this.accounts[account._id] = account
      );
  }

  private computeBalance() {
    let totalBalance = 0
    for (let key in this.accounts) {
      totalBalance += this.accounts[key].balance
    }
    this.totalBalanceChange.next(totalBalance)
  }

  delete(id) {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/${id}`, options)
      .toPromise()
      .then((account: any) => {
        delete this.accounts[account._id];
      })
  }
}
