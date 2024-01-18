import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  map!: GoogleMap;
  @ViewChild('mapaPanel') mapRef!: ElementRef<HTMLElement>;
  polygonId?: string;

  constructor() {}

  async crearMapa(lat: number, lng: number) {
    this.printCurrentPosition();

    this.map = await GoogleMap.create({
      id: 'mapaPanel',
      element: document.getElementById('mapaPanel') as HTMLElement,
      apiKey: 'AIzaSyDon5hzHRwL1069HmRZ7XVNREzQdwxV5zA',
      config: {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 11,
      },
    });

    // this.addPolygons();
    //addpolygons
  }

  async printCurrentPosition() {
    try {
      Geolocation.requestPermissions();
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates.coords.altitude);   
    } catch (error) {
      console.log(error);
    }
  }

  ionViewWillEnter() {}

  ionViewDidEnter() {
    // this.crearMapa(-2.189822999999990, -79.88775);
  }

  ngOnInit() {
    this.crearMapa(-2.18982299999999, -79.88775);
  }
}
