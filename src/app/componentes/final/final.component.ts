import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

import { CadastroService } from 'src/app/services/cadastro.service';
import { RespostasService } from 'src/app/services/respostas.service';
import { ValorCorridaService } from 'src/app/services/valorCorrida.service';
import { ValorCorridaComDescontoService } from 'src/app/services/valorCorridaComDesconto.service';
import { NomeTaxistaService } from 'src/app/services/nomeTaxista.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent {
  nome: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  uf: string = '';
  cidade: string = '';
  email: string = '';
  telefone: string = '';
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  resposta4: string = '';
  valorCorrida: number = 0;
  valorComDesconto: number = 0;
  nomeTaxista: string = '';

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public cadastroService: CadastroService,
    public respostasService: RespostasService,
    private valorCorridaService: ValorCorridaService,
    private valorCorridaComDescontoService: ValorCorridaComDescontoService,
    private nomeTaxistaService: NomeTaxistaService
  ) { }

  ngOnInit() {
    this.cadastroService.formData$.subscribe((formData: Record<string, string>) => {
      this.nome = formData['nome'];
      this.cpf = formData['cpf'];
      this.dataNascimento = formData['dataNascimento'];
      this.uf = formData['uf'];
      this.cidade = formData['cidade'];
      this.email = formData['email'];
      this.telefone = formData['telefone'];
    });

    this.valorCorridaService.valorCorrida$.subscribe(valorCorrida => {
      this.valorCorrida = valorCorrida;
      console.log(this.valorCorrida)
    });

    this.valorComDesconto = this.valorCorridaComDescontoService.getValorComDesconto();
    console.log(this.valorComDesconto)

    this.nomeTaxista = this.nomeTaxistaService.getNomeTaxista();
    this.cdr.detectChanges();
    console.log(this.nomeTaxista);
  }

  voltarParaQuestionario() {
    this.router.navigate(['/inicio/cadastro/questionario-1/numero']);
  }

  exibirAlertaFinalizar() {
    Swal.fire({
      title: 'Finalizar cadastro?',
      text: 'Ao clicar em avançar, você será redirecionado(a) à página inicial e não poderá se cadastrar novamente!',
      showDenyButton: true,
      confirmButtonText: 'Avançar',
      denyButtonText: `Voltar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalizar();
      } else if (result.isDenied) {
        // Nada acontece
      }
    });
  }

  finalizar() {

    // Dados pessoais
    const dadosPessoasParaEnviar = {
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      uf: this.uf,
      cidade: this.cidade,
      email: this.email,
      telefone: this.telefone
    };

    // Enviar dados
    this.http.post('https://web-production-1653.up.railway.app/pessoas/pessoas/', dadosPessoasParaEnviar).subscribe(
      (response: any) => {
        const pessoaId = response.id;

        const dadosRespostasParaEnviar = {
          pessoa: pessoaId, 
          resposta1: this.respostasService.resposta1,
          resposta2: this.respostasService.resposta2,
          resposta3: this.respostasService.resposta3,
          resposta4: this.respostasService.resposta4
        };

        this.http.post('https://web-production-1653.up.railway.app/pessoas/respostas/', dadosRespostasParaEnviar).subscribe(
          (response: any) => {

            const dadosValoresParaEnviar = {
              pessoa: pessoaId, 
              valorCorrida: this.valorCorrida,
              valorCorridaComDesconto: this.valorComDesconto
            };

            this.http.post('https://web-production-1653.up.railway.app/pessoas/valores/', dadosValoresParaEnviar).subscribe(
              (response: any) => {
                // ngZone para corrigir a chamada no Alert
                this.ngZone.run(() => {
                  this.router.navigate(['/inicio']);
                });
              },
              (errorValores: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Erro!',
                  text: 'Ocorreu um erro ao enviar os dados dos valores.'
                });
              }
            );
          },
          (errorRespostas: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Ocorreu um erro ao enviar os dados das respostas.'
            });
          }
        );
      },
      (errorPessoas: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao enviar os dados pessoais.'
        });
      }
    );
  }
} 
