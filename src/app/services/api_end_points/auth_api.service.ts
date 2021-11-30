import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LResponse } from 'src/app/models/l_response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {

  url!: string;

  constructor(private http: HttpClient) {
    super();
    this.url = this.baseUrl + '/auth';
  }

  login(user: User): Observable<LResponse<string>> {
    return this.http.post<LResponse<string>>(this.url + '/login', {
      'email': user.email!,
      'pwd': user.pwd!
    });

  }
}


export interface User {
  email?: string,
  name?: string,
  pwd?: string,
}



