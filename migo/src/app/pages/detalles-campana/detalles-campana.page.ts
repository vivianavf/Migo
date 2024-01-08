import { Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { ModalController, NavController } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';
import { Sector } from 'src/app/interfaces/sector';
// import { Sector } from 'src/app/interfaces/sector';
// import { GoogleMap } from '@capacitor/google-maps';
// import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
// import { GoogleMap, GoogleMaps, GoogleMapOptions, LatLng, Polygon, PolygonOptions } from '@ionic-native/google-maps';

import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { SectorService } from 'src/app/providers/sector.service';

@Component({
  selector: 'app-detalles-campana',
  templateUrl: './detalles-campana.page.html',
  styleUrls: ['./detalles-campana.page.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DetallesCampanaPage implements OnInit {

  campana!: Campana;
  empresas: Empresa[] = [];
  usuarios: User[] = [];
  clientes: Client[] = [];
  sectores: Sector[] = [];
  sector !: Sector;
  empresaSeleccionada !: Empresa;
  nombreEmpresa = "-";
  correoEncargado = "--@--";
  
  
  //Mapa de Google Maps
  // polygon: any;
  map!: GoogleMap;
  @ViewChild('mapElement') mapRef!: ElementRef<HTMLElement>;
  polygonId?: string;

  constructor(
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private empresaService: EmpresaService,
    private sectorService: SectorService,
    private navCtrl: NavController,
  ) { }

  async mostrarNotificaciones(){
    const modal = await this.modalController.create({
    component: NotificacionesPage,
    componentProps:{

    },
    cssClass: 'notificaciones,'
    })
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user: this.userService.usuarioActivo(),
        client: this.clientService.clienteActivo(),
      },
      cssClass: 'menu',
    })

    return await modal.present();
  }

  abrirFormulario(){
    this.navCtrl.navigateRoot('formulario-aplicacion');
  }

  // Mapas con Capacitor
  async crearMapa(lat: number, lng: number){
    this.map = await GoogleMap.create({
      id: 'mapaSector',
      element: document.getElementById('map')  as HTMLElement,
      apiKey: 'AIzaSyDon5hzHRwL1069HmRZ7XVNREzQdwxV5zA',
      config:{
        center:{
          lat: lat,
          lng: lng,
        },
        zoom: 11,
        streetViewControl: false,
        disableDefaultUI: true,
      }
    })

    this.addPolygons();
    //addpolygons
  }

  async addPolygons(){
    if(this.sector){
      await this.sector.cerco_virtual.forEach((cercoVirtual)=>{
        const polygon: Polygon = {
          paths: [
            cercoVirtual
          ],
          strokeColor: '#ffffff',
          strokeWeight: 2,
          fillColor: '#ff00ff',
          fillOpacity: 0.35,
        };
  
        this.map.addPolygons([polygon]);
        // this.poligonId = result[0];
      })
    }
  }

  generarDatos(){
    this.campana = this.campanaService.getCampanaActual();
    var idEmpresa = this.campana.id_empresa;
    this.empresaService.getEmpresas().subscribe((data)=>{
      this.empresas = data;
      const busquedaEmpresa = this.empresas.find(({ id_empresa }) => id_empresa === idEmpresa);
      if(busquedaEmpresa)this.nombreEmpresa = busquedaEmpresa.nombre;
    });
    
    this.sectorService.getSectores().subscribe((data)=>{
      this.sectores = data;
      this.campana = this.campanaService.getCampanaActual()
      data.forEach((sectorX)=>{
        if(sectorX.id_sector === 19){
          this.sector = sectorX;
        }
      })
    })
    this.crearMapa(-2.189822999999990, -79.88775);

  }

  ionViewWillEnter(){
    try {
      console.log("WILL ENTER")
      this.generarDatos();
    } catch (error) {
      
    }
   
  }

  ngOnInit() {

    try {
      console.log("WILL ENTER")
      this.generarDatos();
    } catch (error) {
      
    }
  }
}
