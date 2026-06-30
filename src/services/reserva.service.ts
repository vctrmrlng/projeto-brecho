import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    private apiUrl = `${environment.apiUrl}/reservas`;

    criarReserva(reserva: any) {
        return this.http.post(this.apiUrl, reserva);
    }

    getReservas() {
        return this.http.get<any[]>(this.apiUrl);
    }

    deleteReserva(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    constructor(private http: HttpClient) { }

}