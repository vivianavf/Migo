import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavigationService } from 'src/app/providers/navigation.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-no-tiene-vehiculo',
  templateUrl: './no-tiene-vehiculo.page.html',
  styleUrls: ['./no-tiene-vehiculo.page.scss'],
})
export class NoTieneVehiculoPage implements OnInit {

  puedeRegistrar: boolean = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private navService: NavigationService,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    const usuarioActivoROL = this.userService.usuarioActivo().rol_usuario;

    switch (usuarioActivoROL) {
      case 2: //chofer
      this.puedeRegistrar = false;
        break;
      case 5: //cliente
      this.puedeRegistrar = true;
        break;
    }
  }

  goHome(){
    this.modalCtrl.dismiss();
    this.router.navigate(['/home']);
  }

  agregarVehiculo() {
    // this.navService.setPagina('/vehiculos');
    this.router.navigate(['/agregar-vehiculo']);
    this.modalCtrl.dismiss();
  }

}
