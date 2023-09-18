import { AbstractControl, ValidatorFn } from '@angular/forms';

function validaCPF(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cpf = control.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (!cpf) {
        return { required: true }; // CPF é obrigatório
      }

    if (cpf.length !== 11) {
      return { invalidCPF: true }; // CPF deve ter 11 dígitos
    }

    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1+$/.test(cpf)) {
      return { invalidCPF: true };
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return { invalidCPF: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return { invalidCPF: true };
    }

    return null; // CPF válido
  };
}

export { validaCPF };
