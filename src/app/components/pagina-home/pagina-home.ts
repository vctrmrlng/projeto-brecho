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

  produtos: Produto[]=[];

  private service = inject(ProdutoService);

  ngOnInit(): void {

  console.log('HOME INICIALIZOU');

  this.service.getProduto().subscribe({
    next: (dados) => {

      console.log('HOME DADOS:', dados);

      this.produtos = dados;

    }
  });

}
}