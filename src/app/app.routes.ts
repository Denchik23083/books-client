import { Routes } from '@angular/router';
import { Register } from './pages/auth/register/register';
import { Login } from './pages/auth/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/books/all-books/all-books').then(m => m.AllBooks)
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
  }
];