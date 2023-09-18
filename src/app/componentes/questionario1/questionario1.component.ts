import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RespostasService } from 'src/app/services/respostas.service';


@Component({
  selector: 'app-questionario1',
  templateUrl: './questionario1.component.html',
  styleUrls: ['./questionario1.component.scss']
})
export class Questionario1Component implements OnInit {

  formSubmitted = false;

  radioForm: FormGroup;
  resposta1Control: FormControl;
  resposta2Control: FormControl;
  resposta3Control: FormControl;
  resposta4Control: FormControl;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private respostasService: RespostasService) { 

    this.radioForm = this.formBuilder.group({
      resposta1: ['', Validators.required],
      resposta2: ['', Validators.required],
      resposta3: ['', Validators.required],
      resposta4: ['', Validators.required],
    });

    this.resposta1Control = this.radioForm.get('resposta1') as FormControl;
    this.resposta2Control = this.radioForm.get('resposta2') as FormControl;
    this.resposta3Control = this.radioForm.get('resposta3') as FormControl;
    this.resposta4Control = this.radioForm.get('resposta4') as FormControl;
  }
  
  ngOnInit(): void {
  }

  voltarParaCadastro() {
    this.router.navigate(['/inicio/cadastro']);
  }

  avancar() {
    this.formSubmitted = true;
  
    if (this.radioForm.valid) {
      //recupera os dados informados

      const resposta1 = this.resposta1Control.value;
      const resposta2 = this.resposta2Control.value;
      const resposta3 = this.resposta3Control.value;
      const resposta4 = this.resposta4Control.value;

      // Armazena na service
      this.respostasService.resposta1 = resposta1;
      this.respostasService.resposta2 = resposta2;
      this.respostasService.resposta3 = resposta3;
      this.respostasService.resposta4 = resposta4;    

  
      this.router.navigate(['/inicio/cadastro/questionario-1/numero']);
    } 
  }
}
