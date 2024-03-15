import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  mostrarTexto = false;
  mostrarFiltro = false;
  toolbarText = ""

  constructor() { }

  setTexto(texto: string){
    this.toolbarText = texto;
  }

  getTexto(){
    return this.toolbarText;
  }

}
