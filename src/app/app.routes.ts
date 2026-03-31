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
    path: 'books/edit/:id',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God'] },
    loadComponent: () =>
      import('./pages/books/edit-book/edit-book').then(m => m.EditBook)
  },
  {
    path: 'books/:id',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God', 'User'] },
    loadComponent: () =>
      import('./pages/books/detail-book/detail-book').then(m => m.DetailBook)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God'] },
    loadComponent: () =>
      import('./pages/users/admin/all-users/all-users').then(m => m.AllUsers)
  },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    data: { roles: ['Admin', 'God'] },
    loadComponent: () =>
      import('./pages/users/admin/detail-user/detail-user').then(m => m.DetailUser)
  },
  {
    path: 'admins',
    canActivate: [authGuard],
    data: { roles: ['God'] },
    loadComponent: () =>
      import('./pages/users/god/all-admins/all-admins').then(m => m.AllAdmins)
  },
  {
    path: 'admins/:id',
    canActivate: [authGuard],
    data: { roles: ['God'] },
    loadComponent: () =>
      import('./pages/users/god/detail-admin/detail-admin').then(m => m.DetailAdmin)
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