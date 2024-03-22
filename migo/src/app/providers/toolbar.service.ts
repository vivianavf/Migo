import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  mostrarTexto = false;
  mostrarFiltro = false;
  toolbarText = ""
  showAdsimg = true;

  constructor(
  ) { }

  setTexto(texto: string){
    this.toolbarText = texto;
  }

  showAds(show: boolean){
    this.showAdsimg = show;
  }

  getTexto(){
    return this.toolbarText;
  }

}
