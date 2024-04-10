import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ChoferService } from 'src/app/providers/chofer.service';
// import { AppComponent } from 'src/app/app.component';
import { ClienteService } from 'src/app/providers/cliente.service';
import { TabsService } from 'src/app/providers/tabs.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user = this.userService.usuarioActivo();
  nombreUsuario = '';

  constructor(
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
    private userService: UsersService,
    private clientService: ClienteService,
    private tabService: TabsService,
    private choferService: ChoferService,
    private toolbarService: ToolbarService,
  ) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  abrirVentana(ventana: string) {
    switch (ventana) {
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

  cerrarSesion() {
    // this.app.hideTabs();
    this.tabService.hideTabs();
    localStorage.clear();
    sessionStorage.clear();
    this.modalController.dismiss();
    this.navCtrl.navigateRoot(['/login']);
    location.reload();
  }

  ngOnInit() {
    // console.log(this.user)
    // console.log(this.client)
    this.toolbarService.setTexto("MENÚ");
    this.toolbarService.showAds(false);

    switch (this.user.rol_usuario) {
      case 2: // es chofer
        this.nombreUsuario = this.choferService.choferActivo().nombre.toString() + " " + this.choferService.choferActivo().apellido.toString();
        break;
      case 5: //es cliente
        this.nombreUsuario = this.clientService.clienteActivo().nombre.toString() + " " + this.clientService.clienteActivo().apellido.toString();
        break;
    }
  }
}
