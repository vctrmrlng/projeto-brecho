import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
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

  private setPageTitle() {
    let activeRoute = this.route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    this.pageTitle = activeRoute.snapshot.data['title'] || '';
  }
}