import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Timer } from 'timer-node';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.page.html',
  styleUrls: ['./eliminar-cuenta.page.scss'],
})
export class EliminarCuentaPage implements OnInit {

  eliminarFlag: boolean = false;

  // timer
  botonEliminarCuenta: boolean = false;
  display: any;

  constructor(
    private ModalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.eliminarFlag = false;
  }

  cerrar(){
    this.ModalCtrl.dismiss();
  }

  aceptar(){
    this.countdownTimer(5);
    this.eliminarFlag = true;
  }

  eliminarCuentaDef(){
    
  }

  countdownTimer(seconds: number) {
    const timer = setInterval(() => {
      this.display = `${seconds}`;
      seconds--;
      if (seconds == 0) {
        this.botonEliminarCuenta = true;
        clearInterval(timer);
      }
    }, 1000);
  }

}
