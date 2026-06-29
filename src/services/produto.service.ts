import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../app/models/produto.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl ;

  getProdutoPorId(id: number) {
    return this.http.get<Produto>(`${this.baseUrl}/produtos/${id}`);
  }

  getMidiasPorProduto(id: number) {
    return this.http.get<any[]>(`${this.baseUrl}/midias/produto/${id}`);
  }

  getTodosProdutos() {
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);
  }

  atualizarProduto(id: number, produto: Produto) {
    return this.http.put(
      `${this.baseUrl}/produtos/${id}`,
      produto
    );
  }

  // ✅ NOVO: endpoint mais simples (status apenas)
  atualizarStatusProduto(id: number, status: number) {

  if (status === 1) {
    return this.http.patch(
      `${this.baseUrl}/produtos/${id}/ativar`,
      {}
    );
  }

  return this.http.patch(
    `${this.baseUrl}/produtos/${id}/inativar`,
    {}
  );
}

  ativarProduto(id: number) {
  return this.http.patch(
    `${this.baseUrl}/produtos/${id}/ativar`,
    {}
  );
  }

inativarProduto(id: number) {
  return this.http.patch(
    `${this.baseUrl}/produtos/${id}/inativar`,
    {}
  );
}
}
