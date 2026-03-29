import { inject, Injectable } from '@angular/core';
import { RegisterReqest } from '../models/register-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)

  private readonly apiUrl = 'http://localhost:5000/api/auth/register';

  register(data: RegisterReqest): Observable<unknown>{
    return this.http.post(this.apiUrl, data)
  }
}
