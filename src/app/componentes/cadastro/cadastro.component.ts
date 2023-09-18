import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IbgeService } from '../../services/ibge.service';
import { CadastroService } from 'src/app/services/cadastro.service';
import { verificaCPFService } from 'src/app/services/verificaCPF.service';

import { validaCPF } from 'src/app/validators/valida.cpf';
import { validaEmail } from 'src/app/validators/valida.email';
import { validaDataNascimento } from 'src/app/validators/valida.data';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})

export class CadastroComponent implements OnInit {
  form!: FormGroup;
  ufs: any[] = [];
  cidades: any[] = [];
  botaoAvancarClicado = false;

  constructor(
    private formBuilder: FormBuilder, 
    private ibgeService: IbgeService, 
    public cadastroService: CadastroService, 
    public verificaCPFService:verificaCPFService, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, validaCPF()]],
      dataNascimento: ['', [Validators.required, validaDataNascimento()]],
      email: ['', [Validators.required, validaEmail()]],
      telefone: ['', Validators.required],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
    });

    // API IBGE
    this.ibgeService.getUFs().subscribe((ufs: any) => {
      this.ufs = ufs;
    });
  }

  // API IBGE
  onUFSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const uf = selectElement.value;
    this.form.get('uf')?.setValue(uf);
    if (uf) {
      this.ibgeService.getCidadesByUF(uf).subscribe((cidades: any) => {
        this.cidades = cidades;
      });
    } else {

      this.cidades = [];
    }
  }

  // input nome
  formataNome() {
    let nomeInput = this.form.get('nome');

    if (nomeInput && nomeInput.value) {
      const words = nomeInput.value.split(' ');
      const formattedWords = words.map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      nomeInput.setValue(formattedWords.join(' '));
    }
  }

  // input data
  formatarData(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (input.length > 8) {
      input = input.substring(0, 8); // Limita a 8 dígitos (dd/mm/aaaa)
    }
    if (input.length > 4) {
      input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Aplica a máscara
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{2})/, '$1/$2'); // Aplica a máscara parcial (dd/mm)
    }
    this.form.get('dataNascimento')?.setValue(input);
  }

  // salva nome na service
  onNomeChange(nome: string) {
    this.cadastroService.setFormValue('nome', nome);
  }

  // salva cpf na service
  onCPFChange(cpf: string) {
    this.cadastroService.setFormValue('cpf', cpf);
  }

  // salva dataNascimento na service
  onDataNascimentoChange(dataNascimento: string) {
    this.cadastroService.setFormValue('dataNascimento', dataNascimento);
  }

  // salva uf na service
  onUFChange(uf: string) {
    this.cadastroService.setFormValue('uf', uf);
  }

  // salva cidade na service
  onCidadeChange(cidade: string) {
    this.cadastroService.setFormValue('cidade', cidade);
  }

  // salva email na service
  onEmailChange(email: string) {
    this.cadastroService.setFormValue('email', email);
  }

  // salva telefone na service
  onTelefoneChange(telefone: string) {
    this.cadastroService.setFormValue('telefone', telefone);
  }

  avancarClick() {
    this.onNomeChange(this.form.get('nome') != null ? this.form.get('nome')!.value : '');
    this.onCPFChange(this.form.get('cpf') != null ? this.form.get('cpf')!.value : '');
    this.onDataNascimentoChange(this.form.get('dataNascimento') != null ? this.form.get('dataNascimento')!.value : '');
    this.onUFChange(this.form.get('uf') != null ? this.form.get('uf')!.value : '');
    this.onCidadeChange(this.form.get('cidade') != null ? this.form.get('cidade')!.value : '');
    this.onEmailChange(this.form.get('email') != null ? this.form.get('email')!.value : '');
    this.onTelefoneChange(this.form.get('telefone') != null ? this.form.get('telefone')!.value : '');
  }

  // Validar formulário
  submitForm() {
    this.botaoAvancarClicado = true;
  
    if (this.form.valid) {
      // Verifica se o CPF é duplicado antes de enviar os dados
      const cpf = this.form.get('cpf')?.value;
      this.verificarCPFDuplicado(cpf);
    } else {
      // Marcar todos os campos como tocados para ativar as mensagens de erro
      this.marcarTodosOsCampos(this.form);
    }
  }
  
  verificarCPFDuplicado(cpf: string) {
    this.verificaCPFService.verificarCPFDuplicado(cpf).subscribe(response => {
      if (response.is_duplicado) {
        Swal.fire({
          icon: 'error',
          title: 'CPF Já cadastrado!',
          text: 'O CPF informado já foi cadastrado anteriormente.',
        });
      } else {
        this.router.navigate(['/inicio/cadastro/questionario-1']);
      }
    });
  }
  
  
  marcarTodosOsCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.marcarTodosOsCampos(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}
