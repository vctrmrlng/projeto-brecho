import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css'
})
export class CadastroUsuario {

  usuario = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    chavePix: '',
    senha: '',
    status: 1
  };

  confirmarSenha = '';

  constructor(private clienteService: ClienteService) {}

  cadastrar() {

    if (!this.usuario.nome.trim()) {
      alert('Informe o nome.');
      return;
    }

    const cpf = this.usuario.cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      alert('CPF deve conter 11 números.');
      return;
    }

    const telefone = this.usuario.telefone.replace(/\D/g, '');

    if (telefone.length < 10 || telefone.length > 11) {
      alert('Telefone deve conter 10 ou 11 números.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(this.usuario.email)) {
      alert('Digite um e-mail válido.');
      return;
    }

    if (!this.usuario.chavePix.trim()) {
      alert('Informe a chave Pix.');
      return;
    }

    const senhaValida =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senhaValida.test(this.usuario.senha)) {
      alert(
        'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.'
      );
      return;
    }

    if (this.usuario.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Mostra no console exatamente o que será enviado
    console.log('Enviando para API:', this.usuario);

    this.clienteService.cadastrar(this.usuario).subscribe({
next: (resposta: any) => {

  console.log('Resposta da API:', resposta);

  // Salva o usuário no localStorage para o login
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  usuarios.push({
    nome: this.usuario.nome,
    email: this.usuario.email,
    senha: this.usuario.senha
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso!');

  this.usuario = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    chavePix: '',
    senha: '',
    status: 1
  };

  this.confirmarSenha = '';
},

      error: (erro: any) => {

        console.error('Erro completo:', erro);

        if (erro.error) {
          console.log('Mensagem da API:', erro.error);
        }

        alert('Erro ao cadastrar usuário. Verifique o Console (F12).');
      }
    });

  }

}