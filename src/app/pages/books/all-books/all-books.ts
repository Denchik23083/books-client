import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book-service';
import { BookResponce } from '../../../models/book-responce.model';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage-service';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-books.html',
  styleUrl: './all-books.css'
})
export class AllBooks {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);

  books = signal<BookResponce[]>([]);
  isLoading = signal(true);
  error = signal('');

  ngOnInit() {
    this.load();
  }

  load() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Ошибка загрузки книг');
        this.isLoading.set(false);
      }
    });
  }

  details(id: number) {
    this.router.navigateByUrl(`/books/${id}`);
  }

  logout() {
    this.tokenStorage.clearTokens();
    this.router.navigateByUrl('/login');
  }
}