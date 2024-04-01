import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

interface Position{
  lat: number,
  lng: number
}

@Component({
  selector: 'app-mapa-cambiar-ubicacion',
  templateUrl: './mapa-cambiar-ubicacion.component.html',
  styleUrls: ['./mapa-cambiar-ubicacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,],
  standalone: true,
})



export class MapaCambiarUbicacionComponent  implements OnInit {

  location!: GeolocationCoordinates;

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.createMap();
  }


  cambiarUbicacion(){}

  getLocation(): Promise<Position>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(response => {
        resolve({lng: response.coords.longitude, lat: response.coords.latitude})
      },
      err =>{
        reject(err);
      })
    })
  }

  async createMap() {

    let loading = await this.loadingCtrl.create({
      message: 'Cargando mapa...',
      spinner: "bubbles",
      showBackdrop: false,
      translucent: true,
    });
    loading.present();

    console.log(this.getLocation().then(position=>{
      console.log("Posicion", position)
      var mapOptions = {
        zoom: 10,
        center: {
          "lat": position.lat,
          "lng": position.lng
      }};
      var mapCreado = new google.maps.Map(
        document.getElementById('map-cambiar-ubi')!,
        mapOptions
      );

      if(mapCreado) loading.dismiss();
    }));
  
  }

}
