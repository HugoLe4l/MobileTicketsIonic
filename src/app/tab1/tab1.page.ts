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
