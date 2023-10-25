import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
})
export class PrivacidadPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
