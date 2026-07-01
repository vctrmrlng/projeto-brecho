import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  pageTitle = 'TESTE MALUCO';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitle();
      });

    this.setPageTitle();
  }

  // 🔐 estado real de login (fonte única)
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // 👤 nome vindo do localStorage (cliente salvo no login)
  get userName(): string {
    const cliente = localStorage.getItem('cliente');
    return cliente ? JSON.parse(cliente).nome : '';
  }

  // 🚪 logout real
  logout(): void {
    this.authService.logout();
  }

  private formatGenero(genero: string): string {
  switch (genero.toLowerCase()) {
    case 'feminino':
      return 'Moda Feminina';
    case 'masculino':
      return 'Moda Masculina';
    case 'infantil':
      return 'Moda Infantil';
    default:
      return 'Categoria';
  }
}

  private setPageTitle() {
    let activeRoute = this.route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const routeTitle = activeRoute.snapshot.data['title'];
    const genero = activeRoute.snapshot.paramMap.get('genero');

    if (genero) {
      const formatado = this.formatGenero(genero);
      this.pageTitle = formatado;
      return;
    }

    this.pageTitle = routeTitle || '';
  }
}