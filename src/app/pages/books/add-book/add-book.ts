import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book-service';
import { TokenStorageService } from '../../../services/token-storage-service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);

  isLoading = signal(false);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required]],
    pagesCount: [0, [Validators.required, Validators.min(1)]],
    publishDate: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.bookService.addBook(this.form.getRawValue()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/books']);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Ошибка при создании книги');
      },
    });
  }

  get title() {
    return this.form.controls.title;
  }

  get author() {
    return this.form.controls.author;
  }

  get pagesCount() {
    return this.form.controls.pagesCount;
  }

  get publishDate() {
    return this.form.controls.publishDate;
  }

  back () {
    this.router.navigate(['/books']);
  }

  logout() {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }
}