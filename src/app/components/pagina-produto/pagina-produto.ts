import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-produto',
  imports: [CommonModule],
  templateUrl: './pagina-produto.html',
  styleUrl: './pagina-produto.css',
})
export class PaginaProduto implements OnInit {

  produto!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    console.log('ID DA ROTA:', id);

    this.produtoService.getProduto().subscribe({
      next: (dados: Produto[]) => {

        const produtoEncontrado = dados.find(p => p.id_produto == id);

        console.log('PRODUTO ENCONTRADO:', produtoEncontrado);

        if (produtoEncontrado) {
          this.produto = produtoEncontrado;
        }

      }
    });

  });

}

}