import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookResponce } from '../models/book-responce.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:6001/api/book';

  getAllBooks(): Observable<BookResponce[]> {
    return this.http.get<BookResponce[]>(this.apiUrl);
  }

  getBook(id: number): Observable<BookResponce> {
    return this.http.get<BookResponce>(`${this.apiUrl}/${id}`);
  }
}