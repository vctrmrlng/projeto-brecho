import { Routes } from '@angular/router';
import { PaginaHome } from './components/pagina-home/pagina-home';
import { PaginaProduto } from './components/pagina-produto/pagina-produto';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { PaginaCategoria } from './components/pagina-categoria/pagina-categoria';
import { Login } from './auth/login-usuario/login-usuario';
import { Institucional } from './institucional/institucional';

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
  path: 'cadastro-usuario',
  component: CadastroUsuario
  },
  {
  path: 'categoria/:genero',
  component: PaginaCategoria
  },
  {
    path: 'cadastro-produto',
    loadComponent: () =>
      import('./components/cadastro-produto/cadastro-produto')
        .then(m => m.CadastroProduto)
  },
  {
  path: 'login',
  component: Login
  },
  {
  path: 'institucional',
  component: Institucional
  }


];