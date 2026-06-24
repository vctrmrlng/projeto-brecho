import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';

interface Midia {
  id: number;
  produtoId: number;
  url: string;
  status: number;
}

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-produto.html',
  styleUrls: ['./pagina-produto.css']
})
export class PaginaProduto implements OnInit {

  produto!: Produto;

  imagens: string[] = [];
  selectedImageIndex: number = 0;
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
  ) {}

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

      // 🔥 1. Produto
      this.produtoService.getProdutoPorId(id).subscribe({
        next: (produto: Produto) => {

          this.produto = produto;

          // 🔥 2. Mídias
          this.produtoService.getMidiasPorProduto(id).subscribe({
            next: (midias: Midia[]) => {

              this.imagens = [
                produto.imagem, // ✅ campo correto do JSON
                ...midias.map(m => m.url) // ✅ campo correto do JSON
              ].filter(Boolean);

              this.selectedImageIndex = 0;

            },
            error: () => {

              this.imagens = [produto.imagem].filter(Boolean);
              this.selectedImageIndex = 0;

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