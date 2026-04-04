import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Para ion-item, ion-button, etc.
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor

import { AtendimentoService } from 'src/app/services/EmAtendimento/atendimento-service';
import { AgentResponse } from 'src/app/services/Agent/agent-response';
@Component({
  selector: 'app-agent-tool',
  templateUrl: './agent-tool.component.html',
  styleUrls: ['./agent-tool.component.scss'],
  imports: [CommonModule, IonicModule] //
})
export class AgentToolComponent  implements OnInit {

  constructor(public atendimentoService: AtendimentoService, public agentResponse: AgentResponse) { }

  ngOnInit() {}
   ChamarProximoDaFila(guiche: number) {
    this.atendimentoService.PegaPrimeiroDaFila(guiche)
  }

  ConcluirAtendimento(guiche: number) {
    this.atendimentoService.ConcluirAtendimento(guiche)
  }
}

