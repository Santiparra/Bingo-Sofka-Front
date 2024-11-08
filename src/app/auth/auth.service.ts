import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

import { SignUpInterface } from '../shared/interfaces/sign-up-data.interface';
import { LoginResponse } from '../shared/interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(data: SignUpInterface): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('http://localhost:3010/api/auth/sign-up', data);
  }

  login(enteredUsername: string , enteredPassword: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('http://localhost:3010/api/auth/login', {
      username: enteredUsername,
      password: enteredPassword
    });
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  getUserData(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token) as DecodedToken; 
        return decoded;
      } catch (error) {
        console.error('Token inválido:', error);
        return null;
      }
    }
    return null;
  }

}

interface DecodedToken {
  id: string;
  username: string;
}