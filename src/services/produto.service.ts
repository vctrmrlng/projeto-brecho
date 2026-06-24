import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../app/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http = inject(HttpClient);
  private baseUrl = 'http://academico3.rj.senac.br/20261prjint3manha-reserva-produtos/api';


  getProduto() {
    return this.http.get<Produto[]>('mock/produto.json');
  }

  // 🔥 NOVO: produto por id (endpoint real futuro)
  getProdutoPorId(id: number) {
  return this.http.get<Produto>(`${this.baseUrl}/produtos/${id}`);
}

  // 🔥 NOVO: midias por produto (endpoint real futuro)
  getMidiasPorProduto(id: number) {
  return this.http.get<any[]>(`${this.baseUrl}/midias/produto/${id}`);
}
}