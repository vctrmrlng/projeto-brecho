import { Routes } from '@angular/router';
import { PaginaHome } from './components/pagina-home/pagina-home';
import { PaginaProduto } from './components/pagina-produto/pagina-produto';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { PaginaCategoria } from './components/pagina-categoria/pagina-categoria';
import { Login } from './auth/login-usuario/login-usuario';
import { Institucional } from './components/institucional/institucional';
import { CadastroProduto } from './components/cadastro-produto/cadastro-produto';

export const routes: Routes = [
  {
    path: '',
    component: PaginaHome,
    data: { title: 'Encontre peças únicas\n com história.' }
  },
  {
    path: 'produto/:id',
    component: PaginaProduto,
    data: { title: 'Encontre peças únicas\n com história.' }
  },
  {
    path: 'cadastro-usuario',
    component: CadastroUsuario,
    data: { title: 'Cadastre-se' }
  },
  {
    path: 'categoria/:genero',
    component: PaginaCategoria,
    data: { title: 'Categoria' }
  },
  {
    path: 'cadastro-produto',
    component: CadastroProduto,
    data: { title: 'Cadastrar Produto' }
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'institucional',
    component: Institucional,
    data: { title: 'Institucional' }
  }
];