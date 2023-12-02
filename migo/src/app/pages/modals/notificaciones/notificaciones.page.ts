import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { IonCard, ModalController } from '@ionic/angular';
import { Notificacion } from 'src/app/interfaces/notificacion';
import { NotificacionesService } from 'src/app/providers/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  @ViewChild('parentNotifications', { read: ElementRef, static: true })
  parentNotifications!: ElementRef;
  notificaciones: Notificacion[] = [];

  constructor(
    private modalController: ModalController,
    private notificacionesService: NotificacionesService,
    private renderer: Renderer2
  ) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  };

  registerPushNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  };

  getDeliveredNotifications = async () => {
    try {
      const notificationList =
        await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    } catch (error) {
      console.log(error);
    }
  };

  eliminarTodo() {
    //eliminar notificaciones del servidor (nunca más regresan, se eliminan para siempreeeee)
  }

  ngOnInit() {
    try {
      const isPushNotificationsAvailable =
        Capacitor.isPluginAvailable('PushNotifications');

      if (isPushNotificationsAvailable) {
        this.getDeliveredNotifications();
        PushNotifications.requestPermissions().then((result) => {
          if (result.receive === 'granted') {
            PushNotifications.register();
            this.registerPushNotifications();
          } else {
          }
        });
        this.addListeners();
      } else {
        console.log('Push Notifications Not Available');
      }
    } catch (error) {
      console.log(error);
    }

    this.notificacionesService.getNotificaciones().subscribe((data) => {
      this.notificaciones = data;

      data.forEach((element) => {
        console.log(element);
        const newCard = this.renderer.createElement('ion-card');
        const divDate = this.renderer.createElement('div')
        this.renderer.addClass(divDate, 'date');
        divDate.innerHTML = `${element.fecha_creacion}`
        this.renderer.appendChild(newCard, divDate);
        //ion-card-content
        const cardContent = this.renderer.createElement('ion-card-content')
        this.renderer.appendChild(newCard, cardContent)
        const imgElement = this.renderer.createElement('img')
        this.renderer.addClass(imgElement, "notif-img")
        this.renderer.setAttribute(imgElement,'src', "../../../../assets/images/migo_logo.png")
        this.renderer.appendChild(cardContent, imgElement)
        const contenidoNotif = this.renderer.createElement('div')
        this.renderer.addClass(contenidoNotif, 'notif-contenido')
        const text1 = this.renderer.createElement('ion-text')
        this.renderer.addClass(text1, 'notif-title')
        this.renderer.addClass(text1, 'bold-text')
        this.renderer.addClass(text1, 'uppercase-text')
        text1.innerHTML = `${element.titulo}`
        this.renderer.appendChild(contenidoNotif, text1)
        const text2 = this.renderer.createElement('ion-text')
        this.renderer.addClass(text2, 'notif-content')
        text2.innerHTML = `${element.descripcion}`
        this.renderer.appendChild(contenidoNotif, text2)
        this.renderer.appendChild(cardContent, contenidoNotif)

        //boton
        const botonDetalles = this.renderer.createElement('ion-button')
        this.renderer.addClass(botonDetalles, 'detalle')
        this.renderer.addClass(botonDetalles, 'capitalize')
        this.renderer.addClass(botonDetalles, 'ion-text-wrap')
        this.renderer.addClass(botonDetalles, 'bold-text')
        botonDetalles.innerHTML = `Ver detalle`
        this.renderer.appendChild(cardContent, botonDetalles)
        
        const ionItem = this.parentNotifications.nativeElement;
        this.renderer.appendChild(ionItem, newCard);
      });
    });
  }
}
