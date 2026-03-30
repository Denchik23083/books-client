import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'books',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God', 'User'] },
    loadComponent: () =>
      import('./pages/books/all-books/all-books').then(m => m.AllBooks)
  },
  {
    path: 'books/add',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God'] },
    loadComponent: () =>
      import('./pages/books/add-book/add-book').then(m => m.AddBook)
  },
  {
    path: 'books/:id',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God', 'User'] },
    loadComponent: () =>
      import('./pages/books/detail-book/detail-book').then(m => m.DetailBook)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register').then(m => m.Register)
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }
];