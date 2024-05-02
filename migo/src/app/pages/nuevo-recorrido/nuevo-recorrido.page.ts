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

interface UbicacionGuardada {
  lng: number;
  lat: number;
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
  currentTime: any = {ms: '0', s: '0', m: "0", h:'0', d: "0"};

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
  dineroRecaudado = 0;
  horaInicio = '...';
  // timer = "00:00"

  //
  idPosicion: any;
  mensajeGPS = true;

  //
  ubicacionesGuardadas: UbicacionGuardada[] = [];
  actualPolygon: any;
  markersCarrito: google.maps.Marker[] = [];

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
    this.fechaInicio = JSON.parse(localStorage.getItem('fecha-inicio-recorrido')!)
    this.solicitud = JSON.parse(localStorage.getItem('solicitud-recorrido')!);
    
    this.usuario = this.userService.usuarioActivo()!;
  }

  startTimer() {
    this.timer.start();

    this.interValidId = setInterval(() => {
      this.currentTime = this.timer.time();
      let segundos = this.timer.time().s;
      if(this.currentTime.s < 10){this.currentTime.s = '0'.concat(segundos.toString())}
      let minutos = this.timer.time().m;
      if(this.currentTime.m < 10){this.currentTime.m = '0'.concat(minutos.toString())}
      let horas = this.timer.time().h;
      if(this.currentTime.h < 10){this.currentTime.h = '0'.concat(horas.toString())}
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
          const nuevoMapa = this.googleMapsService.createInitPoint(
            pos,
            14,
            'nuevo-recorrido',
            this.mapaRecorrido,
            this.sector.cerco_virtual,
            pos
          )!;
          this.mapaRecorrido = nuevoMapa;
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
      { timeout: 5000, maximumAge: 5000},
      (position, err) => {
        if (err) {
          console.error('Error al obtener la posición:', err);
        } else {
          this.handlePositionUpdate(position!);
        }
      }
    );
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

  guardarUbicacion(nuevaPosicion: UbicacionGuardada) {
    const ubicaciones: UbicacionGuardada[] = this.obtenerUbicaciones();
    this.ubicacionesGuardadas = ubicaciones;

    if (ubicaciones.length === 0) {
      //dibujar un marker como punto de inicio
    } else {
      if (this.mapaRecorrido) {
        const ubicacionAnterior = ubicaciones[ubicaciones.length - 1];

        //para el contador de KMS
        this.kms += this.calcularDistanciaenKMS(ubicacionAnterior, nuevaPosicion);
        this.kms = this.redondearFloat(this.kms, 2);

        //en la posicion anterior borrar el carrito
        if (this.markersCarrito.length > 0) {
          this.markersCarrito.pop()!.setMap(null);
        }
        let markerAnterior = new google.maps.Marker({
          position: ubicacionAnterior,
          map: this.mapaRecorrido,
          icon: '/assets/iconos-migo/route-location.png',
          optimized: false,
        });
        markerAnterior.setMap(this.mapaRecorrido);
        
        //añadir un marker de carrito a la nueva posicion
        let marker = new google.maps.Marker({
          position: nuevaPosicion,
          map: this.mapaRecorrido,
          icon: '/assets/iconos-migo/location-car-animated.gif',
          optimized: false,
        });

        this.markersCarrito.push(marker);
        marker.setMap(this.mapaRecorrido);

        //dibujar una linea desde la ubicacion anterior
        const flightPath = new google.maps.Polyline({
          path: [ubicacionAnterior, nuevaPosicion],
          geodesic: true,
          strokeColor: '#E50000',
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

    // var distanciaMetros = google.maps.geometry.spherical.computeDistanceBetween(puntoA, puntoB)
    // var distanciaKMS = distanciaMetros * 0.001;

    return d * 1609;
  }

  calcularDineroRecaudado() {
    //
    // ********************
    // Como calcular el dinero recaudado???
    // En formulario de Registro de Campaña añadir los campos (6):
    // "puerta_conductor": 0.0,
    // "puerta_pasajero": 0.0,
    // "puerta_traseratzq": 0.0,
    // "puerta_traseraDer": 0.0,
    // "carroceria_guantera": 0.0,
    // "carroceria_techo": 0.0,
    // valores entre 0 y 1 (a modo de porcentajes)
    // Pero con booleanos, cosa que ahi ya se que parte del carro el conductor brandeó
    // Luego de eso, sacar los valores con true
    // por ejemplo = ["puerta_conductor", "puerta_pasajero"]
    // Luego Sacar en Campaña Publicitaria el valor de esos brandeos.
    // pongo un contador x cada parte del auto posible (6)
    // Obtengo la cantidad de kms recorridos
    // puerta_conductor = 0.50 x km
    // puerta_pasajero = 0.25 x km
    // multiplico cada valor que esta guardado en la campaña x la cantidad de kms
    // y sumo cada parte al contador (igual son valores estaticos)

    console.log("calculando dinero... ")
    // var values = Object.keys(this.solicitud).filter(key => this.solicitud[key])
    return 0;
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

  finalizarRecorrido() {
    console.log('Recorrido Finalizado....');
    const KMSRecorridos = this.kms;
    const KMSRedondeados = this.redondearFloat(KMSRecorridos, 2);
    const fechaActual = new Date().toLocaleString();
    const dinero = this.calcularDineroRecaudado();

    const nuevoRecorrido: RecorridoRealizado = {
      id_vehiculo: this.vehiculo.id_vehiculo!,
      id_usuario: this.usuario.id_usuario,
      id_campana: this.campana.id_campana,
      fecha_hora_inicio: new Date(String(this.fechaInicio!)),
      fecha_hora_fin: new Date(String(fechaActual)),
      kilometraje_recorrido: KMSRedondeados,
      dinero_recaudado: dinero,
      id_ciudad: this.usuario.id_ciudad,
      id_pais: this.usuario.id_pais,
      estado: 1,
      ubicaciones: this.ubicacionesGuardadas,
    };

    // console.log("recorrido finalizado", nuevoRecorrido)
    // this.stopTimer();
    // location.reload();
    // this.router.navigate(['/panel'])

    console.log('Creando el recorrido ... ', nuevoRecorrido);
    this.stopTimer();
    // location.reload();
    // this.tabService.showTabs();
    this.resetLocalStorage();

    // this.recorridoService
    //   .crearRecorrido(nuevoRecorrido)
    //   .subscribe((response) => {
    //     this.stopTimer();
    //     location.reload();
    //     this.tabService.hideTabs();
    //     this.resetLocalStorage();
    //     // this.router.navigate(['/panel']);
    //   });
  }
}
