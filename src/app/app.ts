import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './pages/auth/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Register],
  template: `<app-register />`,
})
export class App {
  protected readonly title = signal('books-client');
}
