import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { MenuPage } from '../modals/menu/menu.page';

@Component({
  selector: 'app-formulario-aplicacion',
  templateUrl: './formulario-aplicacion.page.html',
  styleUrls: ['./formulario-aplicacion.page.scss'],
})
export class FormularioAplicacionPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private campanaService: CampanaService,
  ) { }

  async mostrarNotificaciones(){
    const modal = await this.modalController.create({
    component: NotificacionesPage,
    componentProps:{

    },
    cssClass: 'notificaciones,'
    })
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user: this.userService.usuarioActivo(),
        client: this.clientService.clienteActivo(),
      },
      cssClass: 'menu',
    })

    return await modal.present();
  }

  ngOnInit() {
  }

}
