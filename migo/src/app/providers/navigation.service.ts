import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  paginaEntrada = ""

  constructor() {

  }

  setPagina(nombre: string){
    this.paginaEntrada = nombre;
  }

  getPaginaAnterior(){
    return this.paginaEntrada;
  }


}
