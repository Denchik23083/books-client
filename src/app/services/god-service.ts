import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponce } from '../models/responces/user-responce.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GodService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7001/api/god';

  getAllAdmins(): Observable<UserResponce[]> {
    return this.http.get<UserResponce[]>(this.apiUrl);
  }

  getAdmin(id: number): Observable<UserResponce> {
    return this.http.get<UserResponce>(`${this.apiUrl}/${id}`);
  }
}
