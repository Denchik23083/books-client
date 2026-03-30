import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../services/book-service';
import { TokenStorageService } from '../../../services/token-storage-service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);
  private readonly tokenStorage = inject(TokenStorageService);

  isLoading = signal(false);
  isBookLoading = signal(true);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required]],
    pagesCount: [1, [Validators.required, Validators.min(1)]],
    publishDate: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage.set('Некорректный id книги');
      this.isBookLoading.set(false);
      return;
    }

    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.form.patchValue({
          title: book.title,
          author: book.author,
          pagesCount: book.pagesCount,
          publishDate: this.toDateInputValue(book.publishDate),
        });

        this.isBookLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Ошибка загрузки книги');
        this.isBookLoading.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.editBook(id, this.form.getRawValue()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/books', id]);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Ошибка обновления книги');
      }
    });
  }

  back(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.router.navigate(['/books', id]);
  }

  logout(): void {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }

  private toDateInputValue(date: string): string {
    return date.split('T')[0];
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
}