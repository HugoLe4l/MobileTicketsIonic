import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentResponse {

  fadeClass: string = '';

  status = {
    sucess: "",  
    mensagem: "Defalut message",
  };

  startFade() {
    this.fadeClass = this.status.sucess; 
  
    setTimeout(() => {
      this.fadeClass = '';
    }, 3000);
  }
}