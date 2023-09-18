import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { ValorCorridaService } from 'src/app/services/valorCorrida.service';
import { ValorCorridaComDescontoService } from 'src/app/services/valorCorridaComDesconto.service';
import { NomeTaxistaService } from 'src/app/services/nomeTaxista.service';

@Component({
  selector: 'app-numero',
  templateUrl: './numero.component.html',
  styleUrls: ['./numero.component.scss']
})
export class NumeroComponent {
  form: FormGroup;
  botaoAvancarClicado = false;
  numeroTaxistaNaoCadastrado = false;
  valorComDesconto: number = 0; 
  nomeTaxista: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public valorCorridaService: ValorCorridaService,
    private valorCorridaComDescontoService: ValorCorridaComDescontoService,
    private nomeTaxistaService: NomeTaxistaService
  ) {
    this.form = this.fb.group({
      taxistaNumber: ['', Validators.required],
      valorCorrida: [null, Validators.required]
    });
  }

  voltarParaQuestionario() {
    this.router.navigate(['/inicio/cadastro/questionario-1']);
  }

  formatarTaxistaNumber(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, '');

    this.form.get('taxistaNumber')?.setValue(input);
  }

  validarNumeroTaxista() {
    const numeroTaxista = this.form.get('taxistaNumber')?.value;

    if (numeroTaxista) {
      return this.http
        .post<any>('https://web-production-1653.up.railway.app/validar_numero_taxista/', { numero: numeroTaxista })
        .toPromise() // Converte a solicitação HTTP em uma promessa para aguardar a resposta e não avançar com número inválido.
        .then((response) => {
          this.nomeTaxista = response.nome_taxista;
          if (response.valido) {
            return true;
          } else {
            this.numeroTaxistaNaoCadastrado = true;
            return false; // O número não é válido
          }
        })
        .catch((error) => {
          this.numeroTaxistaNaoCadastrado = true;
        });
    } else {
      this.numeroTaxistaNaoCadastrado = false;
      this.cdr.detectChanges();
      return false; // O número não é válido, pois está vazio
    }  
  } 

  get valorCorridaFormatado(): string {
    const valor = this.form.get('valorCorrida')?.value;
    return valor ? (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  formatarValorInput(event: any) {
    const input = event.target as HTMLInputElement;
    const numericValue = input.value.replace(/\D/g, '');
    this.form.get('valorCorrida')?.setValue(numericValue, { emitEvent: false });
  }

  transformarEmNumero(valorFormatado: string): number {
    return parseFloat(valorFormatado.replace(/[^\d.,]/g, '').replace(',', '.'));
  }

  formatarNumeroParaMostrar(valorNumerico: number): string {
    return valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  calcularValorComDesconto() {
    const valorNumerico = this.transformarEmNumero(this.valorCorridaFormatado);
    this.valorComDesconto = valorNumerico * 0.9; // Aplica desconto de 10%
  }

  // Validar formulário
  async submitForm() {
    this.botaoAvancarClicado = true;

    if (this.form.valid) {
      const numeroTaxistaValido = await this.validarNumeroTaxista(); // Usa o await para aguardar a validação do número de taxista

      if (numeroTaxistaValido) {
        this.calcularValorComDesconto(); // Calcula o valor com desconto antes de avançar
        this.valorCorridaComDescontoService.setValorComDesconto(this.valorComDesconto);
        const valorCorridaFormatado = this.valorCorridaFormatado;
        this.valorCorridaService.setValorCorridaFormatado(valorCorridaFormatado);
        this.nomeTaxistaService.setNomeTaxista(this.nomeTaxista);

        this.router.navigate(['/inicio/cadastro/questionario-1/numero/final']);
      } else {
        this.marcarCampoComoTocado();
      }
    } else {
      this.marcarCampoComoTocado();
    }
  }

  marcarCampoComoTocado() {
    this.form.get('taxistaNumber')?.markAsTouched();
  }
}
