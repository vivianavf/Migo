import { Component, NgZone, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
  Platform,
  PopoverController,
} from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { Campana } from 'src/app/interfaces/campana';

import { Marca } from 'src/app/interfaces/marca';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { CampanaComponent } from '../campana/campana.component';
import { TabsService } from 'src/app/providers/tabs.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { MarcasComponent } from '../marcas/marcas.component';
import { GlobalServiceService } from 'src/app/providers/global-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // backButton: Subscription = new Subscription();

  opcionSeleccionada: any;
  segmentValue: string = 'campanas';

  campanas: Campana[] = [];
  marcas: Marca[] = [];

  mostrarBotonFiltro = true;

  customPopoverOptions: any = {
    cssClass: 'popover-wide',
  };

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private platform: Platform,
    private navCtrl: NavController,
    private popOverCtrl: PopoverController,
    private campanaComponent: CampanaComponent,
    private marcaComponent: MarcasComponent,
    private tabService: TabsService,
    private toolbarService: ToolbarService,
    private globalService: GlobalServiceService,
  ) {}


  ngOnInit() {
    this.globalService.getObservable().subscribe((data)=>{console.log(data)})
    this.toolbarService.setTexto('HOME');
    this.tabService.showTabs();
  }

  actualizarOrden(orden: string) {
    this.popOverCtrl.dismiss();
    switch (orden) {
      case 'tarif-ascendente':
        this.campanaComponent.ordenarTarifaAscendente();
        break;
      case 'tarif-descendente':
        this.campanaComponent.ordenarTarifaDescendente();
        break;
      case 'ascendente': //ordenar campana
        this.campanaComponent.ordenarAscendente();
        break;
      case 'descendente': //ordenar campana
        this.campanaComponent.ordenarDescendente();
        break;
      case 'sect-ascendente':
        this.campanaComponent.ordenarSectorAscendente();
        break;
      case 'sect-descendente':
        this.campanaComponent.ordenarSectorDescendente();
        break;
    }
  }

  async mostrarMenu() {
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps: {
        user: this.userService.usuarioActivo(),
        client: this.clienteService.clienteActivo(),
      },
      cssClass: 'menu',
    });

    return await modal.present();
  }

  async mostrarNotificaciones() {
    const modal = await this.modalController.create({
      component: NotificacionesPage,
      componentProps: {},
      cssClass: 'notificaciones',
    });

    return await modal.present();
  }
}
