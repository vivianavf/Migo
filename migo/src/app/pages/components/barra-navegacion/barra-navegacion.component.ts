import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MenuPage } from '../../modals/menu/menu.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../../modals/notificaciones/notificaciones.page';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { CommonModule } from '@angular/common';
import { AdsComponent } from '../ads/ads.component';


@Component({
  standalone: true,
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AdsComponent],
})
export class BarraNavegacionComponent implements OnInit {
  mostrarBotonFiltro = false;
  mostrarTitulo = true;
  textoToolbar = ""

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private toolbarService: ToolbarService,
  ) {
    
  }

  //Solo activa el ON INIT
  ngOnInit() {
    if(this.toolbarService.getTexto() == "HOME"){
      this.mostrarTitulo = false;
      this.mostrarBotonFiltro = true;
      this.textoToolbar = this.toolbarService.getTexto();
    }else{
      this.mostrarTitulo = true;
      this.mostrarBotonFiltro = false;
      this.textoToolbar = this.toolbarService.getTexto();
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
