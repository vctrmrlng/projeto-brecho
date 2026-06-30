import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../models/produto.model';
import { Footer } from "../../shared/footer/footer";

@Component({
  selector: 'app-pagina-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Footer],
  templateUrl: './pagina-categoria.html',
  styleUrls: ['./pagina-categoria.css']
})
export class PaginaCategoria {

  genero: string = '';
  produtosFiltrados: Produto[] = [];

  loading: boolean = true;

  precoMaximo: number = 999999;
  ordenacao: string = 'padrao';

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genero = params.get('genero') || '';
      this.carregarProdutos();
    });
  }

  carregarProdutos() {
  this.loading = true;

  this.produtoService.getTodosProdutos().subscribe((produtos: Produto[]) => {

    let filtrados = produtos.filter((p: Produto) => {

      const genero = p.genero?.toLowerCase();
      const faixa = p.faixaEtaria;

      if (this.genero === 'masculino') {
        return genero === 'masculino' && (faixa === 5 || faixa === 6);
      }

      if (this.genero === 'feminino') {
        return genero === 'feminino' && (faixa === 5 || faixa === 6);
      }

      if (this.genero === 'infantil') {
        return faixa === 1 || faixa === 2 || faixa === 3 || faixa === 4;
      }

      return false;
    });

    this.produtosFiltrados = filtrados;
    this.loading = false;

  });
}
}
