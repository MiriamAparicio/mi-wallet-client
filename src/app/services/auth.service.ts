import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private apiUrl = environment.apiUrl + '/auth';

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  private setUser(user?: any) {
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  me(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/me`, options)
      .toPromise()
      .then((user) => this.setUser(user))
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
        }
      });
  }

  login(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/login`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  signup(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/signup`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  logout(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/logout`, {}, options)
      .toPromise()
      .then(() => this.setUser());
  }

  getUser(): any {
    return this.user;
  }
}
