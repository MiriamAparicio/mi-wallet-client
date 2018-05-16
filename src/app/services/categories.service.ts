import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoriesService {

  private apiUrl = environment.apiUrl + '/categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/`, options) 
      .toPromise();
  }

}
