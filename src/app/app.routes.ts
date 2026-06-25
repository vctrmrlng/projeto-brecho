import { Routes } from '@angular/router';
import { PaginaHome } from './components/pagina-home/pagina-home';
import { PaginaProduto } from './components/pagina-produto/pagina-produto';

export const routes: Routes = [
  {
    path: '',
    component: PaginaHome
  },
  {
    path: 'produto/:id',
    component: PaginaProduto
  },
  {
  path: 'teste-status',
  loadComponent: () =>
    import('./components/teste-status/teste-status')
      .then(m => m.TesteStatusComponent)
  }
];