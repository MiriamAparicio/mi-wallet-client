import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { RecordsService } from './records.service';
import { AuthService } from './auth.service';

@Injectable()
export class AccountsService {

  private apiUrl = environment.apiUrl + '/accounts';

  private ready: Promise<any>;
  private accounts = {};

  private totalBalanceChange: Subject<any> = new Subject();
  totalBalanceChange$: Observable<any> = this.totalBalanceChange.asObservable();


  constructor (
    private recordService: RecordsService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {

    this.ready = this.loadAll();

    this.recordService.newRecord$.subscribe((record) => {
      if(record.type.toLowerCase() ==="expense"){
        this.accounts[record.account].balance -= record.amount;
      } else {
        this.accounts[record.account].balance += record.amount;
      }      
      this.computeBalance();
    })
    
    //if the user change empty the cache, and if there's a new user load their accounts
    this.authService.userChange$.subscribe( (user) => this.resetCache(!!user));
  }

  private loadAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/`, options)
      .toPromise()
      .then((accounts: Array<any>) => {
        accounts.forEach((account) => {
          this.accounts[account._id] = account;
        })
        return accounts;
      })
  }

  private resetCache(doReload: boolean) {
    this.accounts = {};
    if (doReload) {
      this.ready = this.loadAll();
    }
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
    return this.httpClient.get(`${this.apiUrl}/${id}/records`, options)
      .toPromise();
  }

  create(account: Object): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/`, account, options)
      .toPromise()
      .then((account: any) => this.accounts[account._id] = account);
  }

  private computeBalance() {
    let totalBalance = 0
    for (let key in this.accounts) {
      totalBalance += this.accounts[key].balance
    }
    this.totalBalanceChange.next(totalBalance);
  }

  delete(id) {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.apiUrl}/${id}`, options)
      .toPromise()
      .then((result) => {
        delete this.accounts[id];
        this.computeBalance();
      })
  }
}
