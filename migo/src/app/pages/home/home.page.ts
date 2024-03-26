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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // backButton: Subscription = new Subscription();

  imgBanner: number = 1;

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
    private ngZone: NgZone,
  ) {}

  ionViewDidEnter() {
    console.log('DID ENTER HOME');
    this.ngZone.run(() => {
      this.campanaComponent.ionViewDidEnter();
      this.marcaComponent.ionViewDidEnter();
      console.log('force update the screen HOME');
    });
    // this.campanaComponent.handleRefresh();
    // this.marcaComponent.handleRefresh();
  }

  ngOnInit() {
    var autoSaveInterval = setInterval(() => {
      this.imgBanner = this.generarNumeroBanner();
    }, 5000);

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
      case 'ascendente':
        this.campanaComponent.ordenarAscendente();
        break;
      case 'descendente':
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

  borrarFiltro() {
    this.mostrarBotonFiltro = false;
  }

  mostrarFiltro() {
    this.mostrarBotonFiltro = true;
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

  generarNumeroBanner() {
    const numeroAleatorio = Math.random();
    // Multiplica por 10 para obtener un número entre 0 (inclusive) y 10 (exclusivo)
    const numeroEntre0Y10 = numeroAleatorio * 15;

    // Añade 1 para obtener un número entre 1 (inclusive) y 11 (exclusivo)
    const numeroEntre1Y11 = numeroEntre0Y10 + 1;

    // Utiliza Math.floor para redondear hacia abajo y obtener un número entero entre 1 y 10
    const numeroFinal = Math.floor(numeroEntre1Y11);
    return numeroFinal;
  }
}
