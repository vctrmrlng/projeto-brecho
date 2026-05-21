import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaProduto } from './components/pagina-produto/pagina-produto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaginaProduto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('brecho');
}
