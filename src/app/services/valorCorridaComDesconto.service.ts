import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValorCorridaComDescontoService {
  private valorComDesconto: number = 0;

  constructor() {}

  setValorComDesconto(valor: number) {
    // Limita o número a 2 casas decimais
    this.valorComDesconto = parseFloat(valor.toFixed(2));
  }

  getValorComDesconto(): number {
    return this.valorComDesconto;
  }
}
