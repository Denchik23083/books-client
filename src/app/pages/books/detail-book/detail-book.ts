import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book-service';
import { BookResponce } from '../../../models/book-responce.model';
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
  error = signal('');

  ngOnInit() {
    this.load();
  }

  load() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error.set('Некорректный id книги');
      this.isLoading.set(false);
      return;
    }

    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Ошибка загрузки книги');
        this.isLoading.set(false);
      }
    });
  }

  back () {
    this.router.navigate(['/books']);
  }

  logout() {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }
}
