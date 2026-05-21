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
  }
];