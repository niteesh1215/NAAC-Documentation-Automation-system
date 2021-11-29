import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

    

  constructor() { }

  login(): boolean {
    return !!localStorage.getItem('token');
  }
}
