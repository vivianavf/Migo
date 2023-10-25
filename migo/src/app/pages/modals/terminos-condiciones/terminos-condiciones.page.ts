import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.page.html',
  styleUrls: ['./terminos-condiciones.page.scss'],
})
export class TerminosCondicionesPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
