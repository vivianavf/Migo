import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.page.html',
  styleUrls: ['./historial-pagos.page.scss'],
})
export class HistorialPagosPage implements OnInit {

  porCobrar = '...'
  recorrido = '...'

  constructor(
    private popOverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  generarRetiro(){

  }

  actualizarOrden(orden: string) {
    this.popOverCtrl.dismiss();
    switch (orden) {
      case 'monto-ascendente':
        // this.campanaComponent.ordenarTarifaAscendente();
        break;
      case 'monto-descendente':
        // this.campanaComponent.ordenarTarifaDescendente();
        break;
      case 'fecha-ascendente':
        // this.campanaComponent.ordenarAscendente();
        break;
      case 'fecha-descendente':
        // this.campanaComponent.ordenarDescendente();
        break;
      case 'estado-ascendente':
        // this.campanaComponent.ordenarSectorAscendente();
        break;
      case 'estado-descendente':
        // this.campanaComponent.ordenarSectorDescendente();
        break;
    }
  }

}
