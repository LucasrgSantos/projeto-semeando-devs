import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NomeTaxistaService {
  private nomeTaxista: string = '';

  setNomeTaxista(nome: string) {
    this.nomeTaxista = nome;
  }

  getNomeTaxista() {
    return this.nomeTaxista;
  }
}
