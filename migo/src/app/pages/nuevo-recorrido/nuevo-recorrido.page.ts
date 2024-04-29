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
import { BackgroundRunner } from '@capacitor/background-runner';
import { Preferences } from '@capacitor/preferences';

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
  currentTime: any = {};

  campana!: Campana;
  vehiculo!: Vehiculo;
  sector!: Sector;
  usuario!: User;
  sectorCampana!: Sector;

  mapaRecorrido!: google.maps.Map;
  centroRecorrido: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

  //variables
  fechaInicio!: Date;
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
    if (!(this.campana && this.vehiculo && this.sector)) {
      this.generarDatos();
    }else{
      console.log("obtengo solamente la ubicacion actual")
      console.log("ELSE VIEW ENTER (aqui dibujaria el mapa)")
    }
  }

  ionViewDidLeave() {
    // this.resetDatos();
    //DEJAR DE VER LA UBICACION?? TAL VEZ
  }

  ngOnInit() {
    this.generarDatos();
    this.dibujarMapaSector();
    // this.trackUbication();
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
    this.fechaInicio = JSON.parse(localStorage.getItem('fecha-inicio-recorrido')!);
    this.usuario = this.userService.usuarioActivo()!;
  }

  startTimer() {
    this.timer.start();

    this.interValidId = setInterval(() => {
      this.currentTime = this.timer.time();
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

  dibujarMapaSector(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const nuevoMapa = this.googleMapsService.createInitPoint(pos, 14, 'nuevo-recorrido', this.mapaRecorrido, this.sector.cerco_virtual, pos)!;
          this.mapaRecorrido = nuevoMapa;
          //comienza a trackear la localizacion
          this.trackUbication();
        }
      );
    }
    
  }

  verificarPermisosUbicacion() {
    this.sectorCampana = this.sectorService.sectoresObtenidos.find(
      (sector) => sector.id_sector === this.campana.id_sector
    )!;
    console.log(
      'SECTOR -- nombre, cerco',
      this.sectorCampana,
      this.sectorCampana.nombre,
      this.sectorCampana.cerco_virtual
    );

    Geolocation.checkPermissions().then((result) => {
      console.log(result);
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

  async trackUbication(){
    //cuando cierro la app, deja de trackear la localizacion
    const watchId = Geolocation.watchPosition({timeout: 5000}, (position, err) => {
      if (err) {
        console.error('Error al obtener la posición:', err);
      } else {
        this.handlePositionUpdate(position!);
      }
    });

    // try {
    //   const result = await BackgroundRunner.dispatchEvent({
    //     label: 'com.migo.ads.check',
    //     event: 'trackLocation',
    //     details: {},
    //   });
    //   console.log('track result -- ', JSON.stringify(result));
    // } catch (err) {
    //   console.log(`ERROR: ${err}`);
    // }
  }

  handlePositionUpdate(position: Position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(`Nueva posición: Latitud ${latitude}, Longitud ${longitude}`);

    // Agregar esa ubicacion como un marker al mapa que ya está creado
    const nuevaPosicion = {
      lat: latitude,
      lng: longitude,
    }
    this.guardarUbicacion(nuevaPosicion);
    // Crear una ruta en Google Maps
  }

  guardarUbicacion(nuevaPosicion: UbicacionGuardada) {

    const ubicaciones: UbicacionGuardada[] = this.obtenerUbicaciones();
    console.log('ubicaciones', ubicaciones)

    if(ubicaciones.length === 0){
      console.log('es la primera ubicacion', nuevaPosicion)
      //dibujar un marker como punto de inicio
      // this.googleMapsService.createFirstMarker({lat: nuevaPosicion.lat, lng: nuevaPosicion.lng}, this.mapaRecorrido);
      // google.maps.event.addListenerOnce(this.mapaRecorrido, "idle", () =>{
        
      // })
    }else{
      console.log('NO es la primera ubicacion', nuevaPosicion)
      //en la posicion anterior borrar el carrito
      //añadir un marker de carrito a la nueva posicion
      if(this.mapaRecorrido){
        let marker = new google.maps.Marker({
          position: nuevaPosicion,
          map: this.mapaRecorrido,
          icon: '/assets/iconos-migo/location-car-animated.gif',
          optimized: false,
        });
  
        marker.setMap(this.mapaRecorrido);
        console.log('marker', marker)
      }
      //dibujar una linea desde la ubicacion anterior
    }

    ubicaciones.push(nuevaPosicion);
    localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));
  }

  obtenerUbicaciones() {
    return localStorage.getItem('ubicaciones')?JSON.parse(localStorage.getItem('ubicaciones')!):[];
  }
  

  obtenerKMSRecorridos(): number{
     // ********************
  // Como calcular el KM RECORRIDO??
  // Obtener el array local de Ubicaciones Guardadas (local Storage)
  // Poner un contador desde 0
  // Poner una variable vacia
  // Si la variable esta vacia, guarda el elemento del array actual y paso al isiguiente
  // Si no esta vacia, calculo los KMS del elemento actual con la diferencia que esta en la variable guardada
  // Esa cantidad de distancia la guardo en el contador
  // devuelvo los KMS recorridos

    let KMScontador = 0.0;
    let ubiMonetizable: UbicacionGuardada[] = [];

    // 1 2 3 4 /// ubicacionesGuardadas 
    // 1 2 3  /// ubiMonetizable

    this.ubicacionesGuardadas.forEach((ubicacion)=>{
      // ubiMonetizable.push(ubicacion);

      if(ubiMonetizable.length > 0){
        let ultimoElemento = ubiMonetizable[ubiMonetizable.length-1];
        KMScontador += this.calcularDistanciaenKMS(ubicacion, ultimoElemento);
        console.log("CONTADOR VA EN - ", KMScontador);
      }

      ubiMonetizable.push(ubicacion);

      // if(ubiMonetizable.length === 0){
      //   ubiMonetizable.push(ubicacion);
      // }else{
      //   let ultimoElemento = ubiMonetizable[ubiMonetizable.length-1];
      //   KMScontador += this.calcularDistanciaenKMS(ubicacion, ultimoElemento);
      //   ubiMonetizable.push(ubicacion);
      // }
    })

    console.log("Finalizacion de contador KMS -- quedó en -- ", KMScontador);

    return KMScontador;
  }

  calcularDistanciaenKMS(puntoA: UbicacionGuardada, puntoB: UbicacionGuardada): number{
    var R = 3958.8; //radio de la tierra en millas

    var rlat1 = puntoA.lat * (Math.PI/180);
    var rlat2 = puntoB.lat * (Math.PI/180);

    var difLat = rlat2 - rlat1;
    var difLong = (puntoB.lng - puntoB.lng) * (Math.PI/180);

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difLat/2)
    * Math.sin(difLat /
      2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin( difLong /
        2) * Math.sin(difLong /2 )));

    // var distanciaMetros = google.maps.geometry.spherical.computeDistanceBetween(puntoA, puntoB)
    // var distanciaKMS = distanciaMetros * 0.001;

    console.log("Distancia entre los puntos:")
    // console.log("API COMP (en KMS) --- ", distanciaKMS);
    console.log("DISTANCIA CAL en millas --- ", d);
    console.log("DISTANCIA CAL EN KMS --- ", d*1609);

    return d*1609;
  }

  calcularDineroRecaudado(){
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
  }  

  resetLocalStorage(){
    if(localStorage.getItem('recorrido')){
      localStorage.removeItem('recorrido')
    }
    if(localStorage.getItem('campana-recorrido')){
      localStorage.removeItem('campana-recorrido')
    }

    if(localStorage.getItem('vehiculo-recorrido')){
      localStorage.removeItem('vehiculo-recorrido')
    }

    if(localStorage.getItem('ubicaciones')){
      localStorage.removeItem('ubicaciones')
    }
    if(localStorage.getItem('sector-recorrido')){
      localStorage.removeItem('sector-recorrido')
    }
    if(localStorage.getItem('fecha-inicio-recorrido')){
      localStorage.removeItem('fecha-inicio-recorrido')
    }
    if(localStorage.getItem('ubicaciones')){
      localStorage.removeItem('ubicaciones')
    }
  }

  redondearFloat(numeroFloat: number, decimales: number){
    const factor = 10 ** decimales;
    return Math.round(numeroFloat*factor) / factor
  }
  
  finalizarRecorrido() {

    console.log("Recorrido Finalizado....");
    
    const KMSRecorridos = this.obtenerKMSRecorridos();
    const KMSRedondeados = this.redondearFloat(KMSRecorridos, 2);
    console.log("KMS SIN REDONDEAR - ", KMSRecorridos)
    console.log("KMS REDONDEADOS -- ", KMSRedondeados)
    const fechaActual = new Date();

    const nuevoRecorrido: RecorridoRealizado = {
      id_vehiculo: this.vehiculo.id_vehiculo!,
      id_usuario: this.usuario.id_usuario,
      id_campana: this.campana.id_campana,
      fecha_hora_inicio: this.fechaInicio,
      fecha_hora_fin: fechaActual,
      kilometraje_recorrido: KMSRedondeados,
      dinero_recaudado: 1,
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
    location.reload();
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
