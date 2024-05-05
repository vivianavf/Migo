import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

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
    private toolbarService: ToolbarService,
    private backButtonComponent: BackButtonsComponent,
  ) {
  }

  ngOnInit() {
    this.toolbarService.setTexto('HISTORIAL DE PAGOS');
    
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
