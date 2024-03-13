import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { AlertController, IonCard, ModalController } from '@ionic/angular';
import { Notificacion } from 'src/app/interfaces/notificacion';
import { NotificacionesService } from 'src/app/providers/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  
  notificaciones: Notificacion[] = [];

  constructor(
    private modalController: ModalController,
    private notificacionesService: NotificacionesService,
    private alertController: AlertController,
  ) {}

  cerrarModal() {
    this.modalController.dismiss();
  }



  async eliminarTodo() {
    
    //eliminar notificaciones del servidor (nunca más regresan, se eliminan para siempreeeee)
    const alert = await this.alertController.create({
      cssClass: "notificationsAlert",
      header: 'Está seguro de eliminar todas las notificaciones?',
      message: 'Esta acción no se puede revertir',
      buttons: [{
        cssClass: "cancelarButton",
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        cssClass: "YesButton",
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
          var cards = document.getElementsByClassName("notifCard");
          while (cards.length > 0) {
            cards[0].remove();
          }
          for (let i = 0; i < this.notificaciones.length; i++) {
            this.notificacionesService.clearNotificaciones(this.notificaciones[i].id_notificacion.toString(), this.notificaciones[i]).subscribe((data) => {
              console.log(data);
            })
          }
        },
      },],
    });

    await alert.present();
  }

  async verMas(fecha_creacion: string, titulo: string, descripcion: string){
    const alert = await this.alertController.create({
      cssClass: "notificationInfo",
      header: titulo,
      subHeader: fecha_creacion,
      message: descripcion,
      //TODO: falta la imagen
      buttons: [
      {
        cssClass: "YesButton",
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
          
        },
      },],
    });

    // await alert.present();

  }

  ngOnInit() {
    this.notificacionesService.getNotificaciones().subscribe((data) => {
      this.notificaciones = data;
      console.log(this.notificaciones)
    })

  }
}
