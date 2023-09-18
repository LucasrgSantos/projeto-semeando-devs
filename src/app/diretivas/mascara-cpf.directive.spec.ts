import { MascaraCpfDirective } from './mascara-cpf.directive';
import { ElementRef } from '@angular/core';

describe('MascaraCpfDirective', () => {
  it('should create an instance', () => {
    const elMock: ElementRef<HTMLInputElement> = {
      nativeElement: document.createElement('input'),
    };
    const directive = new MascaraCpfDirective(elMock);
    expect(directive).toBeTruthy();
  });
});
