import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-no-tiene-vehiculo',
  templateUrl: './no-tiene-vehiculo.page.html',
  styleUrls: ['./no-tiene-vehiculo.page.scss'],
})
export class NoTieneVehiculoPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
    this.modalCtrl.dismiss();
  }

}
