import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  constructor(private modalController: ModalController) {}

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
  }
}
