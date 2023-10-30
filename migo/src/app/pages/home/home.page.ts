import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { Location } from '@angular/common';
import { CampanaComponent } from '../campana/campana.component';
import { MarcasComponent } from '../marcas/marcas.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  opcionSeleccionada: any;
  segmentValue: string = 'campanas';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private platform: Platform,
    private location: Location,
  ) {
    this.initializeApp();
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user : this.userService.usuarioActivo(),
        client: this.clienteService.clienteActivo(),
      },
      cssClass: 'menu',
    });

    return await modal.present();
  }

  initializeApp(){

    this.location.subscribe(()=>{
      this.location.forward();
    });
    this.platform.ready().then(()=>{
      this.platform.backButton.subscribeWithPriority(9999,()=>{
        return;
      })
    })
  }
  cerrarSesion(){
    this.router.navigate(['/login'])
  }

}
