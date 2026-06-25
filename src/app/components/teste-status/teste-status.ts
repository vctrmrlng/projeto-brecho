import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-teste-status',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teste-status.html'
})
export class TesteStatusComponent {

  produtoId = 1;

  constructor(private produtoService: ProdutoService) {}

  ativar() {
    this.produtoService.ativarProduto(this.produtoId)
      .subscribe({
        next: res => console.log('ATIVOU', res),
        error: err => console.error(err)
      });
  }

  inativar() {
    this.produtoService.inativarProduto(this.produtoId)
      .subscribe({
        next: res => console.log('INATIVOU', res),
        error: err => console.error(err)
      });
  }

}