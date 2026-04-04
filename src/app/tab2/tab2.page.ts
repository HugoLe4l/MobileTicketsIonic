import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FilaService } from '../services/Fila/fila-service';
import { HistoricoChamadasService } from '../services/HistoricoChamada/historico-chamadas';
import { AtendimentoService } from '../services/EmAtendimento/atendimento-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  constructor(public filaService: FilaService, public historicoChamadasService: HistoricoChamadasService, public atendimentoService: AtendimentoService) { }
  nome: string = '';
  tipoSenha: string = '';


  get listaFilaCompleta() {
    const total = 10
    const lista = [...this.filaService.listaFila]

    while (lista.length < total) {
      lista.push(null)
    }
    return lista
  }

  get totalSG(): number {
    return this.filaService.listaFila.filter(item => item.tipoSenha === "SG").length
  }
  get totalSE(): number {
    return this.filaService.listaFila.filter(item => item.tipoSenha === "SE").length
  }
  get totalSP(): number {
    return this.filaService.listaFila.filter(item => item.tipoSenha === "SP").length
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.nome = "";
    this.tipoSenha = "";
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    const dados = {
      tipoSenha: this.tipoSenha,
      nome: this.nome
    }

    this.nome = "";
    this.tipoSenha = "";

    this.modal.dismiss(dados, 'confirm');

  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.filaService.AddToFila(event.detail.data['tipoSenha'], event.detail.data['nome'])
      const audio = new Audio("../../assets/audio/paper.mp3")
      audio.play()
    }
  }

   ChamarProximoDaFila(guiche: number) {
    this.atendimentoService.PegaPrimeiroDaFila(guiche)
    
  }

  ConcluirAtendimento(guiche: number) {
    this.atendimentoService.ConcluirAtendimento(guiche)
  }

}
