import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
  ) {}

  // =========================
  // UTIL
  // =========================

  getStatus(): string {
    return String(this.produto?.status ?? '').trim();
  }

  getTextoBotao(): string {
    const status = this.getStatus();

    if (status === '2') return 'Reservado';
    if (status === '3') return 'Vendido';

    return 'Reservar';
  }

  getFaixaEtariaLabel(valor: number): string {
    return this.faixaEtariaMap[valor] ?? 'Não informado';
  }

  // =========================
  // AÇÃO BOTÃO (TESTE LIMPO)
  // =========================
  private montarPayloadAtualizado(novoStatus: number) {
  return {
    id: this.produto.id,
    clienteId: this.produto.clienteId,
    descricao: this.produto.descricao,
    preco: this.produto.preco,
    dataDeCadastro: this.produto.dataDeCadastro,
    tamanho: this.produto.tamanho,
    genero: this.produto.genero,
    faixaEtaria: this.produto.faixaEtaria,
    status: novoStatus,
    imagem: this.produto.imagem
  };
  }
  
  alterarStatus(): void {
  if (!this.produto) return;

  const atual = Number(this.produto.status);

  // vendido não muda
  if (atual === 3) return;

  const novoStatus = atual === 1 ? 2 : 1;

  const payload = this.montarPayloadAtualizado(novoStatus);

  // 🔥 atualiza UI IMEDIATAMENTE (sem esperar backend)
  this.produto.status = novoStatus;

  this.produtoService.atualizarProduto(this.produto.id, payload)
    .subscribe({
      next: () => {
        console.log('✅ STATUS SALVO NO BACKEND');
      },
      error: (err) => {
        console.error('❌ ERRO NO BACKEND:', err);

        // 🔥 rollback se falhar
        this.produto.status = atual;
      }
    });
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

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

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
        }
      });

    });
  }
}