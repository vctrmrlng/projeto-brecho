import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-produto.html',
  styleUrl: './pagina-produto.css',
})
export class PaginaProduto implements OnInit {

  produto!: Produto;
  imagens: string[] = [];
  selectedImageIndex: number = 0;
  midias: any[] = [];
  produtosRelacionados: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));


      this.produtoService.getProdutoPorId(id).subscribe({
        next: (produto) => {

          this.produto = produto;

          // 🔥 AQUI começa o segundo endpoint
          this.produtoService.getMidiasPorProduto(id).subscribe({
            next: (midias) => {

              // 🔥 AQUI você monta o carrossel FINAL
              this.imagens = [
                produto.imagemPrincipal,          // ✔ SLIDE 0 (produto)
                ...midias.map(m => m.midia_url)   // ✔ SLIDE 1+
              ];

              // 🔥 garante que começa na primeira imagem
              this.selectedImageIndex = 0;

            }
          });

        }
      });


      this.produtoService.getMidiasPorProduto(id).subscribe({
        next: (midias) => {
          this.midias = midias;
        },
        error: (err) => console.error(err)
      });

    });

  }
}