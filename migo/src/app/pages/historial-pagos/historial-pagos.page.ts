import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';
import { FotopreviewPage } from '../modals/fotopreview/fotopreview.page';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.page.html',
  styleUrls: ['./historial-pagos.page.scss'],
})
export class HistorialPagosPage implements OnInit {

  porCobrar = '120.47'
  recorrido = '67.28'

  constructor(
    private popOverCtrl: PopoverController,
    private toolbarService: ToolbarService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.toolbarService.setTexto('HISTORIAL DE PAGOS');
  }

  generarRetiro(){

  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: FotopreviewPage,
      cssClass: 'fotopreview',
      componentProps: {
        FotoURL: '../../assets/images/pago-exitoso.jpg'
      },
    });

    modal.present();
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
