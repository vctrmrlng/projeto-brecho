import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoCadastroService } from '../../../services/produto-cadastro.service';
import { ProdutoCadastro } from '../../models/produto-cadastro.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.css'
})
export class CadastroProduto {

  produto: ProdutoCadastro = {
    descricao: '',
    preco: 0,
    dataDeCadastro: '',
    tamanho: '',
    genero: '',
    faixaEtaria: 0,
    status: 1,
    imagem: ''
  };

  constructor(private produtoCadastroService: ProdutoCadastroService) {}

  cadastrar() {

    // Define automaticamente os campos ocultos
    this.produto.status = 1;
    this.produto.dataDeCadastro = new Date().toISOString().split('T')[0];

    if (this.produto.descricao.trim().length < 5) {
      alert('Descrição muito curta.');
      return;
    }

    if (this.produto.preco < 1) {
      alert('Preço mínimo é R$ 1,00.');
      return;
    }

    if (!this.produto.tamanho) {
      alert('Informe o tamanho.');
      return;
    }

    if (!this.produto.genero) {
      alert('Selecione o gênero.');
      return;
    }

    if (this.produto.faixaEtaria === 0) {
      alert('Selecione a faixa etária.');
      return;
    }

    console.log('Enviando produto:', this.produto);

    this.produtoCadastroService.cadastrar(this.produto)
      .subscribe({

        next: (resposta: any) => {

          console.log('Produto cadastrado:', resposta);

          alert('Produto cadastrado com sucesso!');

          this.produto = {
            descricao: '',
            preco: 0,
            dataDeCadastro: '',
            tamanho: '',
            genero: '',
            faixaEtaria: 0,
            status: 1,
            imagem: ''
          };

        },

        error: (erro: any) => {

          console.error('Erro ao cadastrar produto:', erro);

          alert('Erro ao cadastrar produto.');

        }

      });

  }

}