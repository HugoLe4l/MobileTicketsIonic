import { Injectable } from '@angular/core';
import { FilaService } from '../Fila/fila-service';
import { HistoricoChamadasService } from '../HistoricoChamada/historico-chamadas';
import { AgentResponse } from '../Agent/agent-response';
@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  constructor(private filaService: FilaService, private historicoChamadasService: HistoricoChamadasService, public agentResponse: AgentResponse) {
    this.CarregarDados();
  }

  listaEmAtendimento: any[] = new Array(5)

  CarregarDados() {
    const LocalStorageEmAtendimento = localStorage.getItem('EmAtendimento')
    if (LocalStorageEmAtendimento) {
      this.listaEmAtendimento = JSON.parse(LocalStorageEmAtendimento)
    }
  }

  PegaPrimeiroDaFila(guiche: number) {
    if (!this.listaEmAtendimento[guiche]) {
      const PegaOPrimeiro = this.filaService.listaFila.shift()

      if (!PegaOPrimeiro) {
        console.log("A fila está vazia.");
        this.agentResponse.status = {
          sucess: "FAIL",
          mensagem: "A fila está vazia."
        }
        this.agentResponse.startFade()
        return;
      }

      const audio = new Audio("assets/audio/ding-dong.mp3")
      audio.play()
      this.filaService.salvarFilaLocalStorage()
      this.listaEmAtendimento[guiche] = PegaOPrimeiro;
      this.salvarEmAtendimentoLocalStorage()
      this.historicoChamadasService.AddHistoricoChamadas(PegaOPrimeiro.senha, PegaOPrimeiro.tipoSenha, guiche)
      console.log(this.listaEmAtendimento);
    } else {
      console.log(`Guichê ${guiche} está ocupado.`);
       this.agentResponse.status = {
          sucess: "FAIL",
          mensagem: `Guichê ${guiche} está ocupado.`
        }
         this.agentResponse.startFade()
    }
  }

  ConcluirAtendimento(guiche: number) {
    if (this.listaEmAtendimento[guiche]) {
      const audio = new Audio("assets/audio/finalizarAtendimento.mp3")
      audio.play()

      this.listaEmAtendimento[guiche] = null
      this.salvarEmAtendimentoLocalStorage()
      console.log(`Atendimento no guichê ${guiche} foi concluido.`)

      this.agentResponse.status = {
        sucess: "OK",
        mensagem: `Atendimento no guichê ${guiche} foi concluido.`
      }
       this.agentResponse.startFade()
      console.log(this.listaEmAtendimento);
    } else {
      console.log(`O Guichê ${guiche} já está vazio.`)
      this.agentResponse.status = {
        sucess: "FAIL",
        mensagem: `O Guichê ${guiche} já está vazio.`
      }
    }
  }

  salvarEmAtendimentoLocalStorage() {
    window.localStorage.setItem("EmAtendimento", JSON.stringify(this.listaEmAtendimento))
  }
}
