import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css'
})
export class Login {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar(): void {

    if (!this.email || !this.senha) {
      alert('Preencha o e-mail e a senha.');
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({

      next: (resposta: any) => {

        console.log('Login realizado:', resposta);

        localStorage.setItem('cliente', JSON.stringify(resposta));

        alert('Login realizado com sucesso!');

        // Altere para a rota desejada quando criar a tela do cliente
        this.router.navigate(['/']);

      },

      error: () => {

        alert('E-mail ou senha inválidos.');

      }

    });

  }

}