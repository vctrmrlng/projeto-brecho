import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { LoginResponse } from '../app/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth/cliente`;

  constructor(private http: HttpClient) { }

  login(email: string, senha: string) {

    return this.http.post<LoginResponse>(this.apiUrl, {
      email,
      senha
    });

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}