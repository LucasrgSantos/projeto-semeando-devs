import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class verificaCPFService {
  private apiUrl = 'https://web-production-1653.up.railway.app/';  

  constructor(private http: HttpClient) {}

  verificarCPFDuplicado(cpf: string): Observable<{ is_duplicado: boolean }> {
    return this.http.get<{ is_duplicado: boolean }>(`${this.apiUrl}verificar-cpf-duplicado/${cpf}/`);
  }
}
