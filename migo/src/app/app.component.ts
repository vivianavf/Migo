import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './providers/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClienteService } from './providers/cliente.service';
import { CampanaService } from './providers/campana.service';
import { register } from 'swiper/element/bundle';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';


register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public users: User[] = [];
  public title = 'my-capacitor-project';

  constructor(
    private userService: UsersService,
    private clientService: ClienteService,
    private campanaService: CampanaService,
    private router: Router,
    private navCtrl: NavController,
  ) {

  }

  navigateHome(){
    this.navCtrl.navigateRoot('/home');
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
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

      if (isPushNotificationsAvailable) {
        //this.getDeliveredNotifications();
        console.log('Texto de comprobacion que el servicio existe y esta activo');
        PushNotifications.requestPermissions().then((result) => {
          console.log('Texto de comprobacion que el servicio va a pedir permiso');
          if (result.receive === 'granted') {
            PushNotifications.register();
            this.registerPushNotifications();
          } else {
            // Show some error
          }
        });
        this.addListeners();
      } else {
        console.log('Push Notifications Not Available :c');
      }
    } catch (error) {
      console.log(error);
    }

    this.userService.getUsers().subscribe((data)=>{})
    this.clientService.getClients().subscribe((data)=>{})
    this.campanaService.getCampanas().subscribe((data)=>{})

    let userExists = localStorage.getItem('usuario_email');
    if(userExists){
      this.navCtrl.navigateRoot('/home');
      //aqui se renderiza el tabs
      
    }else{
      // Set Login Page as Root
      // this.router.navigate(['/login']);
      
      this.navCtrl.navigateRoot('/login')
      console.log("no hay nada")
    }
  }
}
