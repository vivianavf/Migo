import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MenuPage } from '../modals/menu/menu.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,]
})
export class BarraNavegacionComponent implements OnInit {
  mostrarBotonFiltro = false;
  mostrarTitulo = true;
  imgBanner: number = 1;
  textoToolbar = ""

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private popOverCtrl: PopoverController,
    private toolbarService: ToolbarService,
  ) {
    
  }

  //Solo activa el ON INIT
  ngOnInit() {
    this.imgBanner = this.generarNumeroBanner();
    this.textoToolbar = this.toolbarService.getTexto();
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

  borrarFiltro() {
    this.mostrarBotonFiltro = false;
    console.log(this.mostrarBotonFiltro);
  }

  mostrarFiltro() {
    this.mostrarBotonFiltro = true;
    console.log(this.mostrarBotonFiltro);
  }
}
