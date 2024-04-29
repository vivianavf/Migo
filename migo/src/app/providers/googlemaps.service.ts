import { Injectable } from '@angular/core';
import { Ubicacion } from '../interfaces/ubicacion';

@Injectable({
  providedIn: 'root',
})
export class GooglemapsService {
  private colorSector = '#12bcbe';
  private colorRuta = '#0e6895';
  private icon = '/assets/iconos-migo/car-map-turquesa.png';

  constructor() {}

  public createMap(
    centro: { lat: number; lng: number },
    zoom: number,
    elementoHTMLMapa: string,
    map: google.maps.Map,
    cerco_virtual?: Ubicacion[][],
    ubicaciones?: Ubicacion[],
    crearRutas?: boolean
  ) {
    if (centro && zoom) {
      var mapOptions = {
        zoom: zoom,
        center: centro,
        disableDefaultUI: false,
        fullscreenControl: true,
      };
      var mapCreado = new google.maps.Map(
        document.getElementById(elementoHTMLMapa)!,
        mapOptions
      );
      map = mapCreado;

      if (cerco_virtual) {
        this.createSector(cerco_virtual, map);
      }

      if (ubicaciones) {
        if (crearRutas) {
          this.createMarkers(ubicaciones, map, true);
        } else {
          this.createMarkers(ubicaciones, map, false);
        }
      }
    }
  }

  private createMarkers(
    ubicaciones: { lat: number; lng: number }[],
    map: google.maps.Map,
    crearRutas: boolean,
    colorRutas?: string
  ) {
    // Polylines
    ubicaciones.forEach((ubicacion) => {
      if (ubicacion) {
        new google.maps.Marker({
          position: { lat: ubicacion.lat, lng: ubicacion.lng },
          map: map,
          icon: this.icon,
        });
      }
    });

    if (crearRutas) {
      this.createRutas(ubicaciones, map);
    }
  }

  private createRutas(
    ubicaciones: { lat: number; lng: number }[],
    map: google.maps.Map
  ) {
    const flightPath = new google.maps.Polyline({
      path: ubicaciones,
      geodesic: true,
      strokeColor: this.colorRuta,
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    flightPath.setMap(map);
  }

  private createSector(cerco_virtual: Ubicacion[][], map: google.maps.Map) {
    cerco_virtual.forEach((cerco) => {
      if (cerco) {
        let createdPolygon = new google.maps.Polygon({
          paths: [cerco],
          strokeColor: this.colorSector,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: this.colorSector,
          fillOpacity: 0.35,
        });
        createdPolygon.setMap(map);
      }
    });
  }

  public createFirstMarker(
    ubicacion: { lat: number; lng: number },
    map: google.maps.Map
  ) {
    const marker = new google.maps.Marker({
      position: ubicacion,
      map: map,
      icon: this.icon,
    });

    marker.setMap(map);
  }

  public createInitPoint(
    centro: { lat: number; lng: number },
    zoom: number,
    elementoHTMLMapa: string,
    map: google.maps.Map,
    cerco_virtual?: Ubicacion[][],
    ubicacion?: Ubicacion,
    crearRutas?: boolean
  ) {

    let mapReturn;

    if (centro && zoom) {
      var mapOptions = {
        zoom: zoom,
        center: centro,
        disableDefaultUI: false,
        fullscreenControl: true,
      };
      var mapCreado = new google.maps.Map(
        document.getElementById(elementoHTMLMapa)!,
        mapOptions
      );
      map = mapCreado;
      mapReturn = mapCreado;

      if (cerco_virtual) {
        this.createSector(cerco_virtual, map);
      }

      if (ubicacion) {
        new google.maps.Marker({
          position: { lat: ubicacion.lat, lng: ubicacion.lng },
          map: map,
          icon: '/assets/iconos-migo/starter-location-pin.png',
        });
      }
    }

    return mapReturn;
  }
}
