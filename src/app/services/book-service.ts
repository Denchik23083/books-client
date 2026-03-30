import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookResponce } from '../models/responces/book-responce.model';
import { BookRequest } from '../models/requests/book-request.model';

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

  addBook(data: BookRequest): Observable<unknown>{
    return this.http.post(this.apiUrl, data)
  }

  deleteBook(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}