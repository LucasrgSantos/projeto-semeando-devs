import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMascaraCpf]'
})
export class MascaraCpfDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    const formattedValue = this.formatCpf(value);
    input.value = formattedValue;
  }

  formatCpf(value: string): string {
    const cpfPattern = /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/;
    const cpfRegex = new RegExp(cpfPattern);
    const result = value.replace(cpfRegex, function (_, p1, p2, p3, p4) {
      return p1 ? p1 + (p2 ? '.' + p2 : '') + (p3 ? '.' + p3 : '') + (p4 ? '-' + p4 : '') : '';
    });
    return result;
  }
}
