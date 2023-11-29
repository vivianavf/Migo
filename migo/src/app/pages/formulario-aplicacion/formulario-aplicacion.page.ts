import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { MenuPage } from '../modals/menu/menu.page';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-aplicacion',
  templateUrl: './formulario-aplicacion.page.html',
  styleUrls: ['./formulario-aplicacion.page.scss'],
})
export class FormularioAplicacionPage implements OnInit {

  formularioAplicacion: FormGroup;
  mostrarMensaje: boolean = false;

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private campanaService: CampanaService,
    public fb: FormBuilder,
  ) {
    this.formularioAplicacion = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      cedula: new FormControl('', Validators.required),
      entidad: new FormControl('', Validators.required),
      tipocuenta: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required)
    });
  }

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
