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
import { AdsService } from './providers/ads.service';
import { EntidadBancariaService } from './providers/entidad-bancaria.service';
import { EmpresaService } from './providers/empresa.service';


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
    private adsService: AdsService,
    private bancoService: EntidadBancariaService,
    private empresaService: EmpresaService,
  ) {

  }

  navigateHome(){
    this.navCtrl.navigateRoot('/home');
  }

  addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
      console.log('antes del local storage');
      localStorage.setItem('token_notificacion', token.value)
      console.log('despues del local storage');
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
        console.log(notification);
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue,
        );
        // console.log("Title", notification.notification.title)
        // console.log("Title to String", notification.notification.title?.toString())
        // console.log("TAG", notification.notification.tag)
        console.log("BODY", notification.notification.body?.toString())
        console.log("DATA - title", notification.notification.data)
        console.log(JSON.stringify(notification.notification.data))
        console.log(JSON.stringify(notification))
        // console.log("SUBTITLE", notification.notification.subtitle?.toString())

        // if(notification.notification.data.message){
        //   console.log("message - notif", notification.notification.data.message)
        // }

        // object [Object]
        
        this.router.navigate(['/verificar-recorrido']);
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

  obtenerPublicidades() {
    /* Ya hicimos la peticion al iniciar la app */
    this.adsService.getPublicidades().subscribe((data) => {
    });
  }


  ngOnInit() {
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
    this.userService.getUsers().subscribe()
    this.clientService.getClients().subscribe()
    this.campanaService.getCampanas().subscribe()
    this.obtenerPublicidades();
    this.bancoService.getEntidadesBancarias().subscribe()
    this.empresaService.getEmpresas().subscribe();

    let userExists = localStorage.getItem('usuario_email');
    let recorridoExists = localStorage.getItem('recorrido')

    if(userExists){
      if(recorridoExists){
        this.navCtrl.navigateRoot('/nuevo-recorrido');
      }else{
        this.navCtrl.navigateRoot('/home');
      }
    }else{
      this.navCtrl.navigateRoot('/login')
      console.log("no hay nada")
    }
  }
}
