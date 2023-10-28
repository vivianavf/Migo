import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @Input() user: any;
  @Input() client: any;
  
  constructor(
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
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

  ngOnInit() {
    console.log(this.user)
    console.log(this.client)
  }

}
