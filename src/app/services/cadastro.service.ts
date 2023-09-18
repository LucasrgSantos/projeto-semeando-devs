import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private formData:  Record<string, string> = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    uf: '',
    cidade: '',
    email: '',
    telefone: ''
  };

  private formDataSource = new BehaviorSubject(this.formData);
  formData$ = this.formDataSource.asObservable();

  setFormValue(fieldName: string, value: string) {
    if (this.formData.hasOwnProperty(fieldName)) {
      this.formData[fieldName] = value;
      this.formDataSource.next(this.formData);
    }
  }

  getFormData() {
    return this.formData;
  }
}
