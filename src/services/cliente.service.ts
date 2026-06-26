import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://academico3.rj.senac.br/20261prjint3manha-reserva-produtos/api/clientes';

  constructor(private http: HttpClient) {}

  cadastrar(cliente: any) {
    return this.http.post(this.apiUrl, cliente);
  }
}
