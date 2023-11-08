import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { Location } from '@angular/common';
import { CampanaComponent } from '../campana/campana.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { Campana } from 'src/app/interfaces/campana';
import { Marca } from 'src/app/interfaces/marca';
import { CampanaService } from 'src/app/providers/campana.service';
import { MarcaService } from 'src/app/providers/marca.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  opcionSeleccionada: any;
  segmentValue: string = 'campanas';

  campanas: Campana[] = [];
  marcas: Marca[] = [];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private platform: Platform,
    private location: Location,
    private campanaService: CampanaService,
    private marcaService: MarcaService,
    // public events: Event,
  ) {
    this.initializeApp();
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user : this.userService.usuarioActivo(),
        client: this.clienteService.clienteActivo(),
      },
      cssClass: 'menu',
    });

    return await modal.present();
  }

  initializeApp(){
    this.location.subscribe(()=>{
      this.location.forward();
    });
    this.platform.ready().then(()=>{
      this.platform.backButton.subscribeWithPriority(9999,()=>{
        return;
      })
    })
  }
  cerrarSesion(){
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
        this.registerPushNotifications();
      } else {
        // Show some error
      }
    });

    this.addListeners();
  }

  addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  registerPushNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

}
