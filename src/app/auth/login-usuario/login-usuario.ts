import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginResponse } from '../../models/login-response.model';

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

      next: (resposta: LoginResponse) => {

        if (!resposta.autenticado) {
          alert('E-mail ou senha inválidos.');
          return;
        }

        console.log('Login realizado:', resposta);

        this.authService.logout(); // limpa qualquer sessão anterior

        localStorage.setItem('token', resposta.token);

        localStorage.setItem('cliente', JSON.stringify({
          clienteId: resposta.clienteId,
          nome: resposta.nome,
          email: resposta.email
        }));

        alert('Login realizado com sucesso!');

        this.router.navigate(['/']);

      },

      error: (erro) => {

        console.error('Erro no login:', erro);

        alert('Não foi possível realizar o login. Tente novamente.');

      }

    });

  }

}