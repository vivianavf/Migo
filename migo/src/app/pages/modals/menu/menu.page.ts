import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
// import { AppComponent } from 'src/app/app.component';
import { ClienteService } from 'src/app/providers/cliente.service';
import { TabsService } from 'src/app/providers/tabs.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user: any = this.userService.usuarioActivo();
  client: any = this.clientService.clienteActivo();
  // user = localStorage.getItem('user');

  constructor(
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
    private userService: UsersService,
    private clientService: ClienteService,
    private tabService: TabsService,
    // private app: AppComponent,
  ) { }

  cerrarModal() {
    this.modalController.dismiss();
  }

  abrirVentana(ventana: string){
    switch(ventana){
      case 'vehiculos':
      this.router.navigate(['/vehiculos']);
      this.modalController.dismiss();
      break;

      case 'verificaciones':
      this.router.navigate(['/verificaciones']);
      this.modalController.dismiss();
      break;

      case 'historial':
      this.router.navigate(['/historial-pagos']);
      this.modalController.dismiss();
      break;

      case 'preguntas':
      this.router.navigate(['/preguntas']);
      this.modalController.dismiss();
      break;

      case 'tips':
      this.router.navigate(['/tips']);
      this.modalController.dismiss();
      break;

      case 'reclamos':
      this.router.navigate(['/reclamos']);
      this.modalController.dismiss();
      break;

    }
  }

  cerrarSesion(){
    // this.app.hideTabs();
    localStorage.clear();
    sessionStorage.clear();
    this.modalController.dismiss()
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    // console.log(this.user)
    // console.log(this.client)
  }

}
