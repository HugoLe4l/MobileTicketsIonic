import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoricoChamadasService {
  constructor() {
    this.CarregarDados()
  }
  listaHistoricoChamadas: any[] = []

  CarregarDados() {
    const LocalStorageHistoricoChamadas = localStorage.getItem('HistoricoChamadas')
    if (LocalStorageHistoricoChamadas) {
      this.listaHistoricoChamadas = JSON.parse(LocalStorageHistoricoChamadas)
    }
  }
  AddHistoricoChamadas(senha: string, tipoSenha: string, guiche: number) {
    this.listaHistoricoChamadas.unshift({ senha: senha, tipoSenha: tipoSenha, guiche: Number(guiche) })

    if (this.listaHistoricoChamadas.length > 5) {
      this.listaHistoricoChamadas.pop();
    }

    this.SalvarHistoricoChamadasLocalStorage()
    console.log(this.listaHistoricoChamadas);
  }

  SalvarHistoricoChamadasLocalStorage() {
    window.localStorage.setItem("HistoricoChamadas", JSON.stringify(this.listaHistoricoChamadas))
  }

}
