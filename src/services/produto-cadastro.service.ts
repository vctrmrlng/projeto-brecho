import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoCadastro } from '../app/models/produto-cadastro.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCadastroService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cadastrar(produto: ProdutoCadastro): Observable<ProdutoCadastro> {
    return this.http.post<ProdutoCadastro>(this.apiUrl, produto);
  }

}