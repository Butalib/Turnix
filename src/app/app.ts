import { Component, signal } from '@angular/core';
import { Layout } from './layout/main-layout/layout/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('turnix');
}
