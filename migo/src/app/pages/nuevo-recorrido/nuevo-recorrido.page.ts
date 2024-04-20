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
import { Geolocation } from '@capacitor/geolocation';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';
import { StatusBar, Style } from '@capacitor/status-bar';

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
    private sectorService: SectorService
  ) {}

  ionViewDidEnter() {
    console.log('VIEW ENTER');
    this.tabService.hideTabs();
    // this.generarDatos();

    if (!(this.campana && this.vehiculo)) {
      this.generarDatos();
      console.log("ya que no hay datos de campana ni vehiculos lo generamos")
    }else{
      console.log("obtengo solamente la ubicacion actual para guardarla en el array de ubicaciones")
      this.obtenerUbicacionActual();
      console.log('ya hay esta info', this.campana, this.vehiculo)
    }
    // 1. El timer debe continuar desde donde lo deje
    // y debe de seguir en segundo plano.
    // 2. debe de recoger la nueva ubicacion.
    // 3. debe de verificar si la ubicacion coincide con el sector
  }

  ionViewDidLeave() {
    // this.resetDatos();
  }

  ngOnInit() {
    console.log("ON INIT");
    // location.reload();
    this.generarDatos();
    // 10 minutos es 600000 ms
    // 15 minutos es 900000 ms
  }

  resetDatos() {
    this.campana = null!;
    this.vehiculo = null!;
    this.usuario = null!;
    this.stopTimer();
  }

  enviarNotificacionesPeriodicas(tiempoMS: number) {
    this.notificacionIntervalId = setInterval(() => {
      // 10 minutos es 600000 ms
      // 15 minutos es 900000 ms
      this.enviarNotificacion
        .enviarNotificacion(
          'Verifica tu recorrido!',
          'Es hora de verificar tu recorrido, por favor, ve a un lugar seguro y prepárate para tomar las fotos'
        )
        .subscribe((response) => {
          console.log(response);
        });
    }, tiempoMS);
  }

  guardarUbicacion(lat: number, lng: number) {
    console.log('guardando la ubicacion...', {lat: lat, lng: lng})
    const peticionStorage = JSON.parse(localStorage.getItem('ubicaciones')!);

    if (peticionStorage) {
      this.ubicacionesGuardadas = peticionStorage;
    }

    if(this.actualPolygon){
      let contieneUbi = google.maps.geometry.poly.containsLocation({lat: lat, lng: lng}, this.actualPolygon);
      this.ubicacionesGuardadas.push({ lat: lat, lng: lng });
        localStorage.setItem(
          'ubicaciones',
          JSON.stringify(this.ubicacionesGuardadas)
        );

      if(contieneUbi){
        //
      }
    }
    
    // Cada que entro a recorridos, debo guardar la ubicacion que tengo actualmente
    // Luego, accedo a un array de Ubicaciones, ordenadas por orden de veces que he entrado a estas ubicaciones
    // Luego, recorro el array y voy poniendo los markers correspondiente a las veces que he hecho la verificacion
    this.dibujarUbicaciones(this.ubicacionesGuardadas);

    // Luego, hago un polyline marcando todas las ubicaciones que tengo guardadas
    // Guardar en el local Storage --> las ubicaciones se van a borrar solamente si salgo de la app
    // Una vez que doy a finalizar recorrido, tengo que ir a la pestaña de Mis Recorridos y mostrar el recorrido que hice
    // Es decir, tengo que acceder a estas ubicaciones

    // Se guarda de manera local mientras tanto, pero una vez que le doy a finalizar recorrido, se envian estas ubicaciones
    // en el campo de recorridosrealizados

    // Ubicaciones Guardadas = [{lat: xx, lng: xx}, {}]
    //
  }

  async dibujarUbicaciones(ubicacionesGuardadas: UbicacionGuardada[]) {

    // pero siempre y cuando los markers estén dentro del sector
  // https://developers.google.com/maps/documentation/javascript/examples/poly-containsLocation

  // solamente si el marker esta dentro del sector puedo monetizar

  // si la ubicacion actual esta fuera del sector, entonces no se guarda

    // const pinViewBackground = new google.maps.marker.PinElement({
    //   background: '#FBBC04',
    // });

    ubicacionesGuardadas.forEach((ubicacion) => {
      new google.maps.Marker({
        position: { lat: ubicacion.lat, lng: ubicacion.lng },
        map: this.mapaRecorrido,
        title: 'Ubicacion!',
      });
    });

    const flightPath = new google.maps.Polyline({
      path: this.ubicacionesGuardadas,
      geodesic: true,
      strokeColor: '#0013FF',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    // this.directionsDisplay = new google.maps.DirectionsRenderer();

    flightPath.setMap(this.mapaRecorrido);

    // this.directionsDisplay.setMap(this.mapaRecorrido);
    // this.directionsDisplay.setOptions({
    //   polylineOptions: {
    //     strokeWeight: 6,
    //     strokeOpacity: 1,
    //     strokeColor: 'blue'
    //   },
    //   suppressMarkers: true
    // })

    // await this.drawPolyline();

    // let primeraUbi = this.ubicacionesGuardadas[0];
    // let ultimaUbi = this.ubicacionesGuardadas[this.ubicacionesGuardadas.length-1];

    // await this.directionsService.route({
    //   origin: primeraUbi,
    //   destination: ultimaUbi,
    //   travelMode: 'DRIVING',
    //   provideRouteAlternatives: true,
    // }, (response: any, status: any) =>{
    //   if(status === 'OK'){
    //     this.directionsDisplay.setDirections(response);
    //   }
    // })

  }

  generarDatos() {
    this.tabService.hideTabs();

    this.timer = new Timer({ startTimestamp: new Date().getTime() });

    this.startTimer();
    this.campana = JSON.parse(localStorage.getItem('campana-recorrido')!);
    this.vehiculo = JSON.parse(localStorage.getItem('vehiculo-recorrido')!);
    this.usuario = this.userService.usuarioActivo()!;
    this.fechaInicio = new Date();

    this.enviarNotificacionesPeriodicas(10000);
    // this.enviarNotificacion.enviarNotificacion(this.campana.nombre_campana, "Asegúrate de estar dentro del sector para monetizar el recorrido").subscribe((response)=>{
    //   console.log(response)
    // })

    // this.fechaInicio = fechaHoy.split('T')[0];
    // this.horaInicio = fechaHoy.split('T')[1].split('.')[0];

    this.sectorService.getSectores().subscribe((data) => {
      this.verificarPermisosUbicacion();
    });
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

    // if(navigator.geolocation){
    //   console.log("UBicacion activada")
    // }else{
    //   console.log("UBicacion desAAactivada")
    // }

    try {
      this.obtenerUbicacionActual();
    } catch (error) {
      console.log('La ubicacion esta desactivada... abriendo modal');
    }
  }

  obtenerUbicacionActual(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.dibujarMapa(pos);
          this.crearCercos();
          this.guardarUbicacion(pos.lat, pos.lng);
          //
        }
      );
    }
  }

  guardarUbicacionenArray(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.guardarUbicacion(pos.lat, pos.lng);
          //
        }
      );
    }
  }

  dibujarMapa(pos: any) {
          this.mapaRecorrido = new google.maps.Map(
            document.getElementById('nuevo-recorrido') as HTMLElement,
            {
              center: pos,
              zoom: 15,
            }
          );

          new google.maps.Marker({
            position: pos,
            map: this.mapaRecorrido,
            title: 'Ubicacion actual!',
          });
          //
  }

  errorPosition(err: any) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }

  crearCercos() {
    console.log('crear cercos', this.sectorCampana);
    if (this.sectorCampana) {
      let createdPolygon: any;

      createdPolygon = new google.maps.Polygon({
        paths: this.sectorCampana.cerco_virtual,
        strokeColor: '#5DD3FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#5DD3FF',
        fillOpacity: 0.35,
      });

      createdPolygon.setMap(this.mapaRecorrido);
      this.actualPolygon = createdPolygon;

      // this.sectorCampana.cerco_virtual.forEach((cerco) => {
      //   if (cerco) {
      //     createdPolygon = new google.maps.Polygon({
      //       paths: [cerco],
      //       strokeColor: '#FF0000',
      //       strokeOpacity: 0.8,
      //       strokeWeight: 2,
      //       fillColor: '#FF0000',
      //       fillOpacity: 0.35,
      //     });

      //     createdPolygon.setMap(this.mapaRecorrido);
      //   }
      // });
    }
  }

  // ********************
  // Como calcular el KM RECORRIDO??
  // Obtener el array local de Ubicaciones Guardadas (local Storage)
  // Poner un contador desde 0
  // Poner una variable vacia
  // Si la variable esta vacia, guarda el elemento del array actual y paso al isiguiente
  // Si no esta vacia, calculo los KMS del elemento actual con la diferencia que esta en la variable guardada
  // Esa cantidad de distancia la guardo en el contador
  // devuelvo los KMS recorridos

  obtenerKMSRecorridos(): number{
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

    this.recorridoService
      .crearRecorrido(nuevoRecorrido)
      .subscribe((response) => {
        this.stopTimer();
        location.reload();
        this.tabService.hideTabs();
        this.resetLocalStorage();
        // this.router.navigate(['/panel']);
      });
  }
}
