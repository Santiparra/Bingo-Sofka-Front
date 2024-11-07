import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { signUp, urlBase } from '../config/const';
import { SignUpInterface } from '../shared/interfaces/sign-up-data.interface';
import { LoginResponse } from '../shared/interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(data: SignUpInterface): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${urlBase}${signUp}`, data);
  }

  
}
