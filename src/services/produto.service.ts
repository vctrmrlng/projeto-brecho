import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../app/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http = inject(HttpClient);

  getProduto() {
  return this.http.get<Produto[]>('mock/produto.json');
}

}