import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/token-responce.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)

  private readonly apiUrl = 'https://localhost:5001/api/auth';

  register(data: RegisterRequest): Observable<unknown>{
    return this.http.post(`${this.apiUrl}/register`, data)
  }

  login(data: LoginRequest): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, data)
  }

  refresh(userId: number, refreshToken: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${this.apiUrl}/refresh`,
      { userId, refreshToken }
    );
  }
}
