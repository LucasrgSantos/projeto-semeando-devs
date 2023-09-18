import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorCorridaService {
  private valorCorridaSource = new BehaviorSubject<number>(0);
  valorCorrida$ = this.valorCorridaSource.asObservable();

  setValorCorridaFormatado(valorFormatado: string) {
    // Remove "R$", espaços em branco e caracteres não numéricos, substitui vírgulas por pontos
    const valorNumerico = parseFloat(valorFormatado.replace(/[^\d.,]/g, '').replace(',', '.'));

    // Limita o número a 2 casas decimais
    const valorComDuasCasasDecimais = parseFloat(valorNumerico.toFixed(2));

    this.valorCorridaSource.next(valorComDuasCasasDecimais);
  }

  getValorCorridaNumerico(): number {
    return this.valorCorridaSource.value;
  }
}
