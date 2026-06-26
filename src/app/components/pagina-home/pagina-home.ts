import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-pagina-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-home.html',
  styleUrl: './pagina-home.css',
})
export class PaginaHome implements OnInit {

  produtos: Produto[] = [];
  produtosFemininos: Produto[] = [];
  produtosMasculinos: Produto[] = [];
  produtosInfantis: Produto[] = [];

  private service = inject(ProdutoService);

  ngOnInit(): void {

    console.log('HOME INICIALIZOU');

    this.service.getTodosProdutos().subscribe({
      next: (dados: Produto[]) => {

        const dadosEmbaralhados = [...dados].sort(() => Math.random() - 0.5);

        this.produtosFemininos = dadosEmbaralhados
          .filter(p => p.genero.toLowerCase() === 'feminino' && (p.faixaEtaria === 5 || p.faixaEtaria === 6))
          .slice(0, 4);

        this.produtosMasculinos = dadosEmbaralhados
          .filter(p => p.genero.toLowerCase() === 'masculino' && (p.faixaEtaria === 5 || p.faixaEtaria === 6))
          .slice(0, 4);

        this.produtosInfantis = dadosEmbaralhados
          .filter(p => p.faixaEtaria >= 1 && p.faixaEtaria <= 4)
          .slice(0, 4);

        console.log('Feminino:', this.produtosFemininos);
        console.log('Masculino:', this.produtosMasculinos);
        console.log('Infantil:', this.produtosInfantis);

      }
    });

  }
}
