import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AplicacaoRoutingModule } from './aplicacao-routing.module';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { InicioComponent } from '../inicio/inicio.component';
import { Questionario1Component } from '../questionario1/questionario1.component';
import { NumeroComponent } from '../numero/numero.component';
import { FinalComponent } from '../final/final.component';
import { TermosComponent } from '../termos/termos.component';


import { MascaraCpfDirective } from '../../diretivas/mascara-cpf.directive';
import { MascaraTelefoneDirective } from '../../diretivas/mascara-telefone.directive';

import { CadastroService } from 'src/app/services/cadastro.service';
import { RespostasService } from 'src/app/services/respostas.service';


@NgModule({
  declarations: [
    InicioComponent,
    CadastroComponent,
    Questionario1Component,
    NumeroComponent,
    FinalComponent,
    TermosComponent,
    MascaraCpfDirective,
    MascaraTelefoneDirective
  ],
  imports: [
    CommonModule,
    AplicacaoRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CadastroService,
    RespostasService,
  ]
})
export class AplicacaoModule { }
