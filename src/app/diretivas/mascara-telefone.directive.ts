import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMascaraTelefone]'
})
export class MascaraTelefoneDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    const formattedValue = this.formatTelefone(value);
    input.value = formattedValue;
  }

  formatTelefone(value: string): string {
    // Remove todos os caracteres não numéricos do valor
    const digits = value.replace(/\D/g, '');

    // Verifica o tamanho do número para aplicar a máscara correta
    if (digits.length <= 10) {
      // Aplica a máscara para telefone fixo (8 ou 9 dígitos)
      const telefonePattern = /(\d{2})(\d{4,5})(\d{4})/;
      return digits.replace(telefonePattern, '($1) $2-$3');
    } else {
      // Aplica a máscara para telefone celular com DDD (11 dígitos)
      const telefonePattern = /(\d{2})(\d{1})(\d{4,5})(\d{4})/;
      return digits.replace(telefonePattern, '($1) $2 $3-$4');
    }
  }
}
