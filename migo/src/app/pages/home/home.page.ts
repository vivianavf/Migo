import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { Campana } from 'src/app/interfaces/campana';
import { Marca } from 'src/app/interfaces/marca';
import { Subscription } from 'rxjs';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  backButton: Subscription = new Subscription();

  opcionSeleccionada: any;
  segmentValue: string = 'campanas';

  campanas: Campana[] = [];
  marcas: Marca[] = [];

  customPopoverOptions: any = {
    cssClass: 'popover-wide',
  };

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private platform: Platform,
    private navCtrl: NavController,
  ) {
    //evitar que el boton de atrás vaya al login
    // this.platform.ready().then(()=>{
    //   this.platform.backButton.subscribeWithPriority(9999,()=>{
    //     document.addEventListener('backbutton', function(event){
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }, false);
    //   });
    // });

    ///

    // this.location.subscribe(()=>{
    //       this.location.forward();
    //     });
    //     this.platform.ready().then(()=>{
    //       this.platform.backButton.subscribeWithPriority(9999,()=>{
    //         return;
    //       })
    //     })
  }

  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribeWithPriority(9999, () => {
      // No hagas nada para evitar la navegación hacia atrás
    });
  }

  ionViewWillLeave() {
    this.backButton.unsubscribe();
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

  async mostrarNotificaciones(){
    const modal = await this.modalController.create({
      component: NotificacionesPage,
      componentProps:{
      },
      cssClass: 'notificaciones',
    });

    return await modal.present();
  }

  // initializeApp(){
  //   this.location.subscribe(()=>{
  //     this.location.forward();
  //   });
  //   this.platform.ready().then(()=>{
  //     this.platform.backButton.subscribeWithPriority(9999,()=>{
  //       return;
  //     })
  //   })
  // }

  cerrarSesion(){
    try{
      // this.router.navigate(['/login'])
      this.navCtrl.navigateRoot('/login')
    }catch(error){
      console.log(error)
    }
    
  }

  ngOnInit() {
    
  }
}
