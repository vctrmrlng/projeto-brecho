import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoCadastroService } from '../../../services/produto-cadastro.service';
import { ProdutoCadastro } from '../../models/produto-cadastro.model';


@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.css'
})
export class CadastroProduto {

produto: ProdutoCadastro = {
  clienteId: 0,
  descricao: '',
  preco: 0,
  dataDeCadastro: '',
  tamanho: '',
  genero: 'masculino',
  faixaEtaria: 0,
  status: 1,
  imagem: ''
};

  constructor(private produtoCadastroService: ProdutoCadastroService) {}

  cadastrar() {

    if (this.produto.clienteId <= 0) {
      alert('Informe o ID do cliente.');
      return;
    }

    if (this.produto.descricao.trim().length < 5) {

    alert('Descrição muito curta.');

    return;


    }

    if (this.produto.preco < 1) {

    alert('Preço mínimo é R$ 1,00.');

    return;

    }

    if (!this.produto.dataDeCadastro) {
      alert('Informe a data de cadastro.');
      return;
    }

    if (!this.produto.tamanho) {
      alert('Selecione o tamanho.');
      return;
    }

    if (!this.produto.genero) {
      alert('Selecione o gênero.');
      return;
    }

    if (this.produto.faixaEtaria < 0) {
      alert('Informe a faixa etária.');
      return;
    }



    console.log('Enviando produto:', this.produto);

    this.produtoCadastroService.cadastrar(this.produto)
      .subscribe({

        next: (resposta: any) => {

          console.log('Produto cadastrado:', resposta);

          alert('Produto cadastrado com sucesso!');

          this.produto = {
            clienteId: 0,
            descricao: '',
            preco: 0,
            dataDeCadastro: '',
            tamanho: '',
            genero: 'masculino',
            faixaEtaria: 0,
            status: 1,
            imagem: ''
          };

        },

        error: (erro: any) => {

          console.error('Erro:', erro);

          alert('Erro ao cadastrar produto.');

        }

      });

  }

}