import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book-service';
import { BookResponce } from '../../../models/responces/book-responce.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage-service';

@Component({
  selector: 'app-detail-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-book.html',
  styleUrl: './detail-book.css',
})
export class DetailBook {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly tokenStorage = inject(TokenStorageService);

  book = signal<BookResponce | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');
  isAdmin = signal(false);

  ngOnInit() {
    this.checkRole();
    this.load();
  }

  load() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage.set('Некорректный id книги');
      this.isLoading.set(false);
      return;
    }

    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Ошибка загрузки книги');
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

  back() {
    this.router.navigate(['/books']);
  }

  edit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.router.navigate(['/books/edit', id]);
  }

  deleteBook() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!confirm('Удалить книгу?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: () => {
        this.errorMessage.set('Ошибка удалении книги');
      },
    });
  }

  logout() {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }
}
