import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-no-tiene-vehiculo',
  templateUrl: './no-tiene-vehiculo.page.html',
  styleUrls: ['./no-tiene-vehiculo.page.scss'],
})
export class NoTieneVehiculoPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private navService: NavigationService,
  ) { }

  ngOnInit() {
  }

  agregarVehiculo() {
    this.navService.setPagina('/vehiculos')
    this.router.navigate(['/agregar-vehiculo']);
    this.modalCtrl.dismiss();
  }

}
