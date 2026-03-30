import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book-service';
import { BookResponce } from '../../../models/responces/book-responce.model';
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
  isAdmin = signal(false);

  ngOnInit() {
    this.checkRole();
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

  checkRole() {
    const token = this.tokenStorage.getAccessToken();

    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (role === 'Admin' || role === 'God') {
      this.isAdmin.set(true);
    }
  }

  details(id: number) {
    this.router.navigate(['/books', id]);
  }

  addBook() {
    this.router.navigate(['/books/add']);
  }

  logout() {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }
}