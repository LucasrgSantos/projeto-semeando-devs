import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  getUFs() {
    return this.http.get(`${this.apiUrl}/estados`);
  }

  getCidadesByUF(uf: string) {
    return this.http.get(`${this.apiUrl}/estados/${uf}/municipios`);
  }
}
