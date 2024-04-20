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


  ngOnInit() {
    this.notificacionesService.getNotificaciones().subscribe((data) => {
      this.notificaciones = data;
      console.log(this.notificaciones)
    })

  }
}
