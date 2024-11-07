import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token'); // Aquí usas el nombre que elijas para el token
    return !!token; // Si el token existe, devuelve true, de lo contrario, false
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Método para guardar el token
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Método para eliminar el token (logout)
  logout(): void {
    localStorage.removeItem('auth_token');
  }

}
