import { AbstractControl, ValidatorFn } from '@angular/forms';

function validaEmail(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;

    if (!email) {
      return null; // O campo está vazio, não aplicar validação
    }

    // Expressão regular para verificar o formato do e-mail
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      return { invalidEmail: true }; // Formato de e-mail inválido
    }

    return null; // E-mail válido
  };
}

export { validaEmail };
