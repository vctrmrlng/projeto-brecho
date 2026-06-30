import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, RouterModule } from '@angular/router'; 7
import { Location } from '@angular/common';
import { Footer } from '../../shared/footer/footer';

interface Midia {
  id: number;
  produtoId: number;
  url: string;
  status: number;
}

@Component({
  selector: 'app-pagina-produto',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './pagina-produto.html',
  styleUrls: ['./pagina-produto.css']
})
export class PaginaProduto implements OnInit {

  produto!: Produto;
  produtoNaoEncontrado = false;

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
    private route: ActivatedRoute,
    private location: Location
  ) { }

  // =========================
  // TEXTO BOTÃO
  // =========================
  getTextoBotao(): string {
    const status = Number(this.produto?.status);

    return status === 0 ? 'Reservado' : 'Reservar';
  }

  // =========================
  // TOGGLE STATUS
  // =========================
  alterarStatus(): void {
    if (!this.produto) return;

    const atual = Number(this.produto.status);
    const novoStatus = atual === 1 ? 0 : 1;

    // UI otimista
    this.produto.status = novoStatus;

    this.produtoService.atualizarStatusProduto(this.produto.id, novoStatus)
      .subscribe({
        next: () => {
          console.log('✅ STATUS ATUALIZADO');
        },
        error: (err) => {
          console.error('❌ ERRO AO ATUALIZAR STATUS:', err);
          this.produto.status = atual; // rollback
        }
      });
  }

  // =========================
  // FAIXA ETÁRIA
  // =========================
  getFaixaEtariaLabel(valor: number): string {
    return this.faixaEtariaMap[valor] ?? 'Não informado';
  }

  // =========================
  // GALERIA
  // =========================
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

  voltar(): void {
    this.location.back();
  }

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));
      this.produtoNaoEncontrado = false;

      this.produtoService.getProdutoPorId(id).subscribe({
        next: (produto: Produto) => {

          this.produto = produto;

          // IMAGENS
          this.produtoService.getMidiasPorProduto(id).subscribe({
            next: (midias: Midia[]) => {

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

          // RELACIONADOS
          this.produtoService.getTodosProdutos().subscribe({
            next: (todos: Produto[]) => {

              this.produtosRelacionados = todos
                .filter(p =>
                  p.id !== produto.id &&
                  (
                    p.genero === produto.genero ||
                    p.faixaEtaria === produto.faixaEtaria
                  )
                )
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            },
            error: (err) => {
              console.error('Erro ao buscar relacionados:', err);
            }
          });

        },
        error: (err) => {

          console.error('Erro ao buscar produto:', err);

          this.produtoNaoEncontrado = true;

          this.produtoService.getTodosProdutos().subscribe({
            next: (todos: Produto[]) => {

              this.produtosRelacionados = [...todos]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            },
            error: (erro) => {
              console.error('Erro ao buscar produtos:', erro);
            }
          });

        }
      });

    });
  }
}
