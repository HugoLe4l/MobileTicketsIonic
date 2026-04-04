import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilaService {
  constructor(){
    this.CarregarDadosDaFila()
  }
  
  listaFila: any[] = [];
  listaFila$ = new BehaviorSubject<any[]>([]);
  
  CarregarDadosDaFila() {
    const LocalStorageFila = localStorage.getItem('fila')
    if (LocalStorageFila) {
      this.listaFila = JSON.parse(LocalStorageFila)
    }
  }
  AddToFila(tipoSenha: string, nome: string) {

    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dataHora = date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(",", "")

    const novaSenha = {
      senha: `${year}${month}${day}${tipoSenha}${this.listaFila.length < 10 ? `0${this.listaFila.length + 1}` : this.listaFila.length + 1}`,
      tipoSenha: tipoSenha,
      nome: nome,
      entrada: dataHora
    }
    this.listaFila.push(novaSenha)

    const PegaSP = this.listaFila.filter(item => item.tipoSenha === "SP")
    const organizaSP = PegaSP.sort((a, b) => a.entrada.localeCompare(b.entrada))

    const PegaSE = this.listaFila.filter(item => item.tipoSenha === "SE")
    const organizaSE = PegaSE.sort((a, b) => a.entrada.localeCompare(b.entrada))

    const PegaSG = this.listaFila.filter(item => item.tipoSenha === "SG")
    const organizaSG = PegaSG.sort((a, b) => a.entrada.localeCompare(b.entrada))

    this.listaFila = [];
    this.listaFila.push(...organizaSP, ...organizaSE, ...organizaSG)

    this.salvarFilaLocalStorage()
  }

  salvarFilaLocalStorage() {
    window.localStorage.setItem("fila", JSON.stringify(this.listaFila))
  }
}
