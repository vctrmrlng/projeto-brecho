import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

interface Midia {
  id: number;
  produtoId: number;
  url: string;
  status: number;
}

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-produto.html',
  styleUrls: ['./pagina-produto.css']
})
export class PaginaProduto implements OnInit {

  produto!: Produto;

  imagens: string[] = [];
  selectedImageIndex = 0;

  produtosRelacionados: Produto[] = [];

  faixaEtariaMap: Record<number, string> = {
    1: 'Recém-nascido (0–3 meses)',
    2: 'Bebê (3–12 meses)',
    3: 'Primeira infância (1–3 anos)',
    4: 'Infantil (4–7 anos)',
    5: 'Juvenil (8–14 anos)',
    6: 'Adulto (15+ anos)'
  };

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  getFaixaEtariaLabel(valor: number): string {
    return this.faixaEtariaMap[valor] ?? 'Não informado';
  }

  prevImage(): void {
    if (!this.imagens.length) return;

    this.selectedImageIndex =
      this.selectedImageIndex === 0
        ? this.imagens.length - 1
        : this.selectedImageIndex - 1;
  }

  nextImage(): void {
    if (!this.imagens.length) return;

    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.imagens.length;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));
      console.log('🔥 ID PRODUTO:', id);

      this.produtoService.getProdutoPorId(id).subscribe({
        next: (produto: Produto) => {

          console.log('🔥 PRODUTO:', produto);
          this.produto = produto;

          // 🔥 IMAGENS
          this.produtoService.getMidiasPorProduto(id).subscribe({
            next: (midias: Midia[]) => {

              console.log('🔥 MÍDIAS:', midias);

              this.imagens = [
                produto.imagem,
                ...(midias?.map(m => m.url) ?? [])
              ].filter(Boolean);

              this.selectedImageIndex = 0;
            },
            error: () => {
              this.imagens = [produto.imagem].filter(Boolean);
              this.selectedImageIndex = 0;
            }
          });

          // 🔥 RELACIONADOS (VERSÃO ROBUSTA)
          this.produtoService.getTodosProdutos().subscribe({
            next: (todos: Produto[]) => {

              const relacionados = todos.filter(p =>
                p.id !== produto.id &&
                (
                  p.genero === produto.genero ||
                  p.faixaEtaria === produto.faixaEtaria
                )
              );

              this.produtosRelacionados = relacionados
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

              console.log('RELACIONADOS FINAL:', this.produtosRelacionados);

            },
            error: (err) => {
              console.error(err);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
        }
      });

    });
  }
}
