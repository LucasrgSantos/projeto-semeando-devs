import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { InicioComponent } from '../inicio/inicio.component';
import { Questionario1Component } from '../questionario1/questionario1.component';
import { NumeroComponent } from '../numero/numero.component';
import { FinalComponent } from '../final/final.component';
import { TermosComponent } from '../termos/termos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: '',
          component: InicioComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'cadastro/questionario-1',
        component: Questionario1Component,
      },
      {
        path: 'cadastro/questionario-1/numero',
        component: NumeroComponent,
      },
      {
        path: 'cadastro/questionario-1/numero/final',
        component: FinalComponent,
      },
      {
        path: 'termos',
        component: TermosComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacaoRoutingModule { }
