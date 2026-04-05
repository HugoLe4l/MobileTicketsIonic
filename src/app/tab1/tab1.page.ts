import { Component } from '@angular/core';
import { AtendimentoService } from '../services/EmAtendimento/atendimento-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public atendimentoService: AtendimentoService) { }

  get QuatidadeEmAtendimento(): number{
    return this.atendimentoService.listaEmAtendimento.filter(item => item != null).length
  }
  get QtdSG_EmAtendimento(): number{
    return this.atendimentoService.listaEmAtendimento.filter(item => item && item.tipoSenha === "SG").length
  }
  get QtdSE_EmAtendimento(): number{
    return this.atendimentoService.listaEmAtendimento.filter(item => item && item.tipoSenha === "SE").length
  }
  get QtdSP_EmAtendimento(): number{
    return this.atendimentoService.listaEmAtendimento.filter(item => item && item.tipoSenha === "SP").length
  }




  get listaEmAtendimentoCompleta() {
    const total = 5
    const lista = [...this.atendimentoService.listaEmAtendimento]

    while (lista.length < total) {
      lista.push(null)
    }
    return lista
  }

  ChamarProximoDaFila(guiche: number) {
    this.atendimentoService.PegaPrimeiroDaFila(guiche)
  }

  ConcluirAtendimento(guiche: number) {
    this.atendimentoService.ConcluirAtendimento(guiche)
  }
}
