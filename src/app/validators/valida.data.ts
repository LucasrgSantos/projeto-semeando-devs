import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

function validaDataNascimento(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = control.value;
    
    if (!inputDate) {
      return { required: true }; // Data é obrigatória
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(inputDate)) {
      return { invalidDate: true }; // Formato inválido
    }

    const parts = inputDate.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Verifica se os valores de dia e mês estão dentro dos intervalos válidos
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      (month === 2 && day > 28) || // Fevereiro, considerando que não é bissexto
      ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) // Meses com 30 dias
    ) {
      return { invalidDate: true }; // Data inválida
    }

    const currentDate = new Date();
    const inputDateFormat = new Date(year, month - 1, day);

    if (isNaN(inputDateFormat.getTime())) {
      return { invalidDate: true }; // Data inválida
    }

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (inputDateFormat < minDate || inputDateFormat > maxDate) {
      return { invalidAgeRange: true }; // Fora do intervalo de idade permitido
    }

    return null; // Data válida
  };
}

export { validaDataNascimento };
