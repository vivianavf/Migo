import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
// import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { MenuPage } from '../modals/menu/menu.page';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { GoogleMapsModule} from '@angular/google-maps'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  // map!: GoogleMap;
  // @ViewChild('mapaPanel') mapRef!: ElementRef<HTMLElement>;
  // polygonId?: string;
  
  modalController: any;
  userService: any;
  clientService: any;

  @ViewChild('map') mapRef!: google.maps.Map;
  center: google.maps.LatLngLiteral = {lat: -2.189822999999990, lng: -79.88775};
  zoom = 15;

  source!: google.maps.LatLngLiteral;
  destination!: google.maps.LatLngLiteral

  ds!: google.maps.DirectionsService;
  dr!: google.maps.DirectionsRenderer;

  constructor() {}

  // async crearMapa(lat: number, lng: number) {
  //   this.printCurrentPosition();

  //   this.map = await GoogleMap.create({
  //     id: 'mapaPanel',
  //     element: document.getElementById('mapaPanel') as HTMLElement,
  //     apiKey: 'AIzaSyDon5hzHRwL1069HmRZ7XVNREzQdwxV5zA',
  //     config: {
  //       center: {
  //         lat: lat,
  //         lng: lng,
  //       },
  //       zoom: 11,
  //     },
  //   });

  //   // this.addPolygons();
  //   //addpolygons
  // }

  ionViewWillEnter() {
    try {
      this.createMap();
    } catch (error) {
      console.log(error)
    }
  }

  createMap() {
  this.ds = new google.maps.DirectionsService ();
  this. dr = new google.maps.DirectionsRenderer({
    map: null,
    suppressMarkers: true,
  });

  this.source = { lat: -2.189822999999990, lng: -79.88775}
  this.destination = { lat: -2.189466004877741, lng: -79.89271528225697 }

  this.setPolyline();

  }

  setPolyline(){
    var mapOptions = {
      zoom:this.zoom,
      center: this.center,
      disableDefaultUI: true,
      fullscreenControl: true,
    }
  
    var map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    let request = {
      origin: this.source,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.ds.route(request, (response, status) =>{
      
      this.dr.setMap(this.mapRef)
      this.dr.setOptions({
        suppressPolylines: false,
        map: map
      }
      )

      if(status == google.maps.DirectionsStatus.OK){
        this.dr.setDirections(response)
      }else{
        console.log("No se pudo dibujar la ruta", response)
      }
    })
  }
  

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

  ngOnInit() {
    //aqui nada
  }
}
