import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campana } from 'src/app/interfaces/campana';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { User } from 'src/app/interfaces/user';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { EnviarNotificacionService } from 'src/app/providers/enviar-notificacion.service';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';
import { TabsService } from 'src/app/providers/tabs.service';
import { UsersService } from 'src/app/providers/users.service';
import { Timer, Time, TimerOptions } from 'timer-node';
import { Geolocation, Position } from '@capacitor/geolocation';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';
import { StatusBar, Style } from '@capacitor/status-bar';
import { GooglemapsService } from 'src/app/providers/googlemaps.service';
import { concat } from 'rxjs';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { ModalController } from '@ionic/angular';
import { FinalizandoRecorridoPage } from '../modals/finalizando-recorrido/finalizando-recorrido.page';

interface UbicacionGuardada {
  lng: number;
  lat: number;
}

interface Monetizacion {
  valorCarroceriaCapo: number;
  valorCarroceriaTecho: number;
  valorPuertaConductor: number;
  valorPuertaPasajero: number;
  valorPuertaTraseraIzq: number;
  valorPuertaTraseraDer: number;
  valorPuertaMaletero: number;
}

@Component({
  selector: 'app-nuevo-recorrido',
  templateUrl: './nuevo-recorrido.page.html',
  styleUrls: ['./nuevo-recorrido.page.scss'],
})
export class NuevoRecorridoPage implements OnInit {
  //timer
  timer!: Timer;
  interValidId: any;
  notificacionIntervalId: any;
  currentTime: any = { ms: '0', s: '0', m: '0', h: '0', d: '0' };

  campana!: Campana;
  vehiculo!: Vehiculo;
  sector!: Sector;
  usuario!: User;
  sectorCampana!: Sector;
  solicitud!: FormularioAplicacion;

  mapaRecorrido!: google.maps.Map;
  centroRecorrido: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

  //variables
  fechaInicio!: String;
  kms = 0;
  kmsMonetizables = 0;
  dineroRecaudado = 0;
  horaInicio = '...';
  // timer = "00:00"

  //
  idPosicion: any;
  mensajeGPS = true;

  //
  ubicacionesGuardadas: UbicacionGuardada[] = [];
  polygonCreado!: google.maps.Polygon;
  markersCarrito: google.maps.Marker[] = [];
  watchId!: string;

  //
  directionsService: any;
  directionsDisplay: any;

  constructor(
    private router: Router,
    private tabService: TabsService,
    private enviarNotificacion: EnviarNotificacionService,
    private recorridoService: RecorridoRealizadoService,
    private userService: UsersService,
    private sectorService: SectorService,
    private googleMapsService: GooglemapsService,
    private modalCtrl: ModalController,
  ) {}

  ionViewDidEnter() {
    this.tabService.hideTabs();
    if (this.mapaRecorrido) {
      this.trackUbication();
    }
  }

  ionViewDidLeave() {
    // this.resetDatos();
    //DEJAR DE VER LA UBICACION?? TAL VEZ
  }

  ngOnInit() {
    this.generarDatos();
    this.dibujarMapaSector();
  }

  resetDatos() {
    this.campana = null!;
    this.vehiculo = null!;
    this.usuario = null!;
    this.stopTimer();
  }

  generarDatos() {
    this.tabService.hideTabs();

    this.timer = new Timer({ startTimestamp: new Date().getTime() });
    this.startTimer();

    this.campana = JSON.parse(localStorage.getItem('campana-recorrido')!);
    this.vehiculo = JSON.parse(localStorage.getItem('vehiculo-recorrido')!);
    this.sector = JSON.parse(localStorage.getItem('sector-recorrido')!);
    this.fechaInicio = JSON.parse(
      localStorage.getItem('fecha-inicio-recorrido')!
    );
    this.solicitud = JSON.parse(localStorage.getItem('solicitud-recorrido')!);

    this.usuario = this.userService.usuarioActivo()!;
  }

  startTimer() {
    this.timer.start();

    this.interValidId = setInterval(() => {
      this.currentTime = this.timer.time();
      let segundos = this.timer.time().s;
      if (this.currentTime.s < 10) {
        this.currentTime.s = '0'.concat(segundos.toString());
      }
      let minutos = this.timer.time().m;
      if (this.currentTime.m < 10) {
        this.currentTime.m = '0'.concat(minutos.toString());
      }
      let horas = this.timer.time().h;
      if (this.currentTime.h < 10) {
        this.currentTime.h = '0'.concat(horas.toString());
      }
    }, 1000);
  }

  stopTimer() {
    this.timer.stop();

    if (this.interValidId) {
      clearInterval(this.interValidId);
      this.interValidId = undefined;
    }

    if (this.notificacionIntervalId) {
      clearInterval(this.notificacionIntervalId);
      this.notificacionIntervalId = undefined;
    }
  }

  dibujarMapaSector() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          let initPointResult = this.googleMapsService.createInitPoint(
            pos,
            14,
            'nuevo-recorrido',
            this.mapaRecorrido,
            this.sector.cerco_virtual,
            pos
          );

          this.mapaRecorrido = initPointResult.mapa!;
          this.polygonCreado = initPointResult.poligono!;
          this.trackUbication();
        }
      );
    }
  }

  verificarPermisosUbicacion() {
    this.sectorCampana = this.sectorService.sectoresObtenidos.find(
      (sector) => sector.id_sector === this.campana.id_sector
    )!;

    Geolocation.checkPermissions().then((result) => {
      if (
        result.location === 'granted' &&
        result.coarseLocation === 'granted'
      ) {
        //
      } else {
        Geolocation.requestPermissions({
          permissions: ['location', 'coarseLocation'],
        });
      }
    });
  }

  async trackUbication() {
    console.log('track ubicacion... ');
    //cuando cierro la app, deja de trackear la localizacion

    const watchId = Geolocation.watchPosition(
      { timeout: 5000, maximumAge: 5000 },
      (position, err) => {
        if (err) {
          console.error('Error al obtener la posición:', err);
        } else {
          this.handlePositionUpdate(position!);
        }
      }
    );

    this.watchId = (await watchId).toString();
  }

  handlePositionUpdate(position: Position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(`Nueva posición: Latitud ${latitude}, Longitud ${longitude}`);

    // Agregar esa ubicacion como un marker al mapa que ya está creado
    const nuevaPosicion = {
      lat: latitude,
      lng: longitude,
    };
    this.guardarUbicacion(nuevaPosicion);
    // Crear una ruta en Google Maps
  }


  /* corregir esta funcion */
  guardarUbicacion(nuevaPosicion: UbicacionGuardada) {

    /// marcar con diferente color si la ubicacion entra o no entra en la monetizacion
    const ubicaciones: UbicacionGuardada[] = this.obtenerUbicaciones();
    this.ubicacionesGuardadas = ubicaciones;

    if (ubicaciones.length === 0) {
      //dibujar un marker como punto de inicio
      //es la primera ubicacion
    } else {
      if (this.mapaRecorrido) {
        const ubicacionAnterior = ubicaciones[ubicaciones.length - 1];

        //en la posicion anterior borrar el carrito
        if (this.markersCarrito.length > 0) {
          this.markersCarrito.pop()!.setMap(null);
        }

        //verifica si la ubicacion ANTERIOR entra en EL SECTOR
        if (google.maps.geometry.poly.containsLocation(ubicacionAnterior, this.polygonCreado)) {
          // contiene la posicion
          //marcar con un circulo verde la posicion anterior si es correcta
          // let markerAnterior = new google.maps.Marker({
          //   position: ubicacionAnterior,
          //   map: this.mapaRecorrido,
          //   icon: '/assets/iconos-migo/green-location.png',
          //   optimized: false,
          // });
          // markerAnterior.setMap(this.mapaRecorrido);
        } else {
          // no contiene la posicion
          //marcar con un circulo ROJO si la posicion anterior NO es correcta
          // let markerAnterior = new google.maps.Marker({
          //   position: ubicacionAnterior,
          //   map: this.mapaRecorrido,
          //   icon: '/assets/iconos-migo/red-location.png',
          //   optimized: false,
          // });
          // markerAnterior.setMap(this.mapaRecorrido);
        }

        //para el contador de KMS recorridos
        // this.kms += this.calcularDistanciaenKMS(ubicacionAnterior,nuevaPosicion);
        // this.kms = this.redondearFloat(this.kms, 2);

        //añadir un marker de carrito a la nueva posicion
      //   const icon = {
      //     url: '/assets/iconos-migo/GPS.png', // url
      //     scaledSize: new google.maps.Size(40, 40), // scaled size
      //     origin: new google.maps.Point(0,0), // origin
      //     anchor: new google.maps.Point(0, 0) // anchor
      // };

        let marker = new google.maps.Marker({
          position: nuevaPosicion,
          map: this.mapaRecorrido,
          icon: '/assets/iconos-migo/GPS.png',
          optimized: false,
        });
        this.markersCarrito.push(marker);
        marker.setMap(this.mapaRecorrido);

        let colorRuta;

        //verifica si la ubicacion NUEVA entra en la monetizacion
        if (
          google.maps.geometry.poly.containsLocation(
            nuevaPosicion,
            this.polygonCreado
          )
        ) {
          // contiene la posicion
          colorRuta = '#7ED57'
          this.kms += this.calcularDistanciaenKMS(ubicacionAnterior,nuevaPosicion);
          this.kms = this.redondearFloat(this.kms, 2);
          this.dineroRecaudado = this.calcularDineroRecaudado(this.kms);
        } else {
          // no contiene la posicion
          colorRuta = '#E50000'
        }

        //dibujar una linea desde la ubicacion anterior
        const flightPath = new google.maps.Polyline({
          path: [ubicacionAnterior, nuevaPosicion],
          geodesic: true,
          strokeColor: colorRuta,
          strokeOpacity: 1.0,
          strokeWeight: 1,
        });
        flightPath.setMap(this.mapaRecorrido);
      }
    }

    ubicaciones.push(nuevaPosicion);
    localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));
  }

  obtenerUbicaciones() {
    return localStorage.getItem('ubicaciones')
      ? JSON.parse(localStorage.getItem('ubicaciones')!)
      : [];
  }

  calcularDistanciaenKMS(
    puntoA: UbicacionGuardada,
    puntoB: UbicacionGuardada
  ): number {
    var R = 3958.8; //radio de la tierra en millas

    var rlat1 = puntoA.lat * (Math.PI / 180);
    var rlat2 = puntoB.lat * (Math.PI / 180);

    var difLat = rlat2 - rlat1;
    var difLong = (puntoB.lng - puntoB.lng) * (Math.PI / 180);

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difLat / 2) * Math.sin(difLat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difLong / 2) *
              Math.sin(difLong / 2)
        )
      );
    return d * 1609;
  }

  calcularDineroRecaudado(KMSRecorridos: number) {
    let monetizacion: Monetizacion = {
      valorCarroceriaCapo: this.solicitud.carroceria_capo?this.campana.tarifa_base * this.campana.carroceria_capo * KMSRecorridos: 0,
      valorCarroceriaTecho: this.solicitud.carroceria_techo?this.campana.tarifa_base * this.campana.carroceria_techo * KMSRecorridos: 0,
      valorPuertaConductor: this.solicitud.puerta_conductor?this.campana.tarifa_base * this.campana.puerta_conductor * KMSRecorridos: 0,
      valorPuertaPasajero: this.solicitud.puerta_pasajero?this.campana.tarifa_base * this.campana.puerta_pasajero * KMSRecorridos: 0,
      valorPuertaTraseraIzq: this.solicitud.puerta_trasera_iz?this.campana.tarifa_base * this.campana.puerta_trasera_iz * KMSRecorridos: 0,
      valorPuertaTraseraDer: this.solicitud.puerta_trasera_der?this.campana.tarifa_base * this.campana.puerta_trasera_der * KMSRecorridos: 0,
      valorPuertaMaletero: this.solicitud.puerta_maletero?this.campana.tarifa_base * this.campana.puerta_maletero * KMSRecorridos: 0,
    };

    return Object.values(monetizacion).reduce((total, valor) => total + valor, 0);
  }

  resetLocalStorage() {
    if (localStorage.getItem('recorrido')) {
      localStorage.removeItem('recorrido');
    }
    if (localStorage.getItem('campana-recorrido')) {
      localStorage.removeItem('campana-recorrido');
    }

    if (localStorage.getItem('vehiculo-recorrido')) {
      localStorage.removeItem('vehiculo-recorrido');
    }

    if (localStorage.getItem('ubicaciones')) {
      localStorage.removeItem('ubicaciones');
    }
    if (localStorage.getItem('sector-recorrido')) {
      localStorage.removeItem('sector-recorrido');
    }
    if (localStorage.getItem('fecha-inicio-recorrido')) {
      localStorage.removeItem('fecha-inicio-recorrido');
    }
    if (localStorage.getItem('ubicaciones')) {
      localStorage.removeItem('ubicaciones');
    }
  }

  redondearFloat(numeroFloat: number, decimales: number) {
    const factor = 10 ** decimales;
    return Math.round(numeroFloat * factor) / factor;
  }

  async finalizarRecorrido() {
    console.log('Recorrido Finalizado....');
    await Geolocation.clearWatch({ id: this.watchId });

    const KMSRecorridos = this.kms;
    const KMSRedondeados = this.redondearFloat(KMSRecorridos, 2);
    const fechaActual = new Date().toLocaleString();
    const dinero = this.dineroRecaudado;

    const nuevoRecorrido: RecorridoRealizado = {
      id_vehiculo: this.vehiculo.id_vehiculo!,
      id_usuario: this.usuario.id_usuario,
      id_campana: this.campana.id_campana,
      fecha_hora_inicio: String(this.fechaInicio!),
      fecha_hora_fin: String(fechaActual),
      kilometraje_recorrido: KMSRedondeados,
      dinero_recaudado: dinero,
      id_ciudad: this.usuario.id_ciudad,
      id_pais: this.usuario.id_pais,
      estado: 1,
      ubicaciones: this.ubicacionesGuardadas,
    };

    const modal = this.modalCtrl.create({
      component: FinalizandoRecorridoPage,
      cssClass: 'finalizandoRecorrido',
      componentProps: {
        recorrido: nuevoRecorrido,
      },
      backdropDismiss: false,
    })

    this.stopTimer();
    this.resetLocalStorage();

    await (await modal).present();
  }
}
