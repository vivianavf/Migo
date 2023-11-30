import { Component, ElementRef, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { ModalController, NavController } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import {GoogleMap, Marker} from '@capacitor/google-maps'

@Component({
  selector: 'app-detalles-campana',
  templateUrl: './detalles-campana.page.html',
  styleUrls: ['./detalles-campana.page.scss'],
})

export class DetallesCampanaPage implements OnInit {

  campana!: Campana;

  constructor(
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private navCtrl: NavController,
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

  async loadMap(){
    
    // GoogleMap.create({
    //   id: 'my-map',
    //   apiKey: "AIzaSyDMg06OQIw-YexoKaDViGwbGizLaL1UoEc",
    //   config: {
    //     center:{
    //       lat: 33.6,
    //       lng: -117.9,
    //     },
    //     zoom: 8,
    //   },
    //   element: ,
    // })
  }

  abrirFormulario(){
    this.navCtrl.navigateRoot('formulario-aplicacion');
  }

  ngOnInit() {
    console.log(this.campanaService.getCampanaActual())
    this.campana = this.campanaService.getCampanaActual()
    this.loadMap();
  }

}