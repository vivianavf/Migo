import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
// import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { MenuPage } from '../modals/menu/menu.page';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';
import { UsersService } from 'src/app/providers/users.service';
import { Router } from '@angular/router';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { Ciudad } from 'src/app/interfaces/ciudad';

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
  clientService: any;

  sectores: Sector[] = [];
  sector?: Sector;

  @ViewChild('map') mapRef!: google.maps.Map;
  map?: google.maps.Map;

  source!: google.maps.LatLngLiteral;
  destination!: google.maps.LatLngLiteral;

  ds!: google.maps.DirectionsService;
  dr!: google.maps.DirectionsRenderer;

  //
  horarioInicio = '';
  horarioFin = '';
  distanciaHoy = 1;
  dineroHoy = 1;
  numeroCampanas = 0;

  //
  dias = 0;
  horas = 0;
  minutos = 0;

  //
  hayRecorridos: boolean = false;

  //recorridos
  recorridosHoy: RecorridoRealizado[] = [];
  recorridosUsuario: RecorridoRealizado[] = [];

  //cobros
  cobro = 0;

  constructor(
    private toolbarService: ToolbarService,
    private sectorService: SectorService,
    private recorridoService: RecorridoRealizadoService,
    private userService: UsersService,
    private router: Router,
    private ciudadService: CiudadService
  ) {}

  ngOnInit() {
    //aqui nada
    this.toolbarService.setTexto('PANEL DE CONTROL');
  }

  ionViewWillEnter() {
    try {
      this.toolbarService.setTexto('PANEL DE CONTROL');
      this.generarDatos();
    } catch (error) {
      console.log(error);
    }
  }

  ionViewWillLeave() {
    this.resetDatos();
  }

  resetDatos() {
    this.recorridosHoy = [];
    this.recorridosUsuario = [];
  }

  generarDatos() {
    const idUsuarioActivo = this.userService.usuarioActivo().id_usuario;
    const idCiudad = this.userService.usuarioActivo().id_ciudad;

    const diaHoy = new Date();
    const dia = diaHoy.getDate().toString();
    const mes = diaHoy.getMonth().toString(); // mes - 1
    const anio = diaHoy.getFullYear().toString();

    this.recorridoService.getRecorridos().subscribe((recorridos) => {
      if (recorridos) {
        //hay recorridos
        this.hayRecorridos = true;
        this.recorridosUsuario = recorridos.filter(
          (recorrido) =>
            recorrido.id_usuario === idUsuarioActivo &&
            idCiudad === recorrido.id_ciudad
        );

        const idCampanas = this.recorridosUsuario.map(
          (recorrido) => recorrido.id_campana
        );
        const campanasSinDuplicar = idCampanas.filter((id, i, self) => {
          return self.indexOf(id) === i;
        });
        this.numeroCampanas = campanasSinDuplicar.length;

        this.recorridosUsuario.forEach((recorrido) => {
          const condicion =
            new Date(recorrido.fecha_hora_inicio).getDate().toString() ===
              dia &&
            new Date(recorrido.fecha_hora_inicio).getMonth().toString() ===
              mes &&
            new Date(recorrido.fecha_hora_inicio).getFullYear().toString() ===
              anio;

          if (condicion) {
            this.recorridosHoy.push(recorrido);
          }
        });

        this.getHorarioInicioHoy();
        this.getHorarioFinHoy();
        this.getTiempoTranscurrido();
        this.generarCobro2Meses();

        //crear Mapa
        this.createMap();
      } else {
        this.hayRecorridos = false;
        //no hay recorridos
      }
    });
  }

  generarCobro2Meses() {
    this.cobro = 0;
  }

  getKMSRecorridos(arr: RecorridoRealizado[]) {
    const KMS = arr.map((recorrido) => recorrido.kilometraje_recorrido);
    var distancia = KMS.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      0
    );
    return distancia.toFixed(2);
  }

  getDineroRecaudado(arr: RecorridoRealizado[]) {
    const R = arr.map((recorrido) => recorrido.dinero_recaudado);
    if (R) {
      var dinero = R.reduce((x, y) => x + y, 0);
      return dinero.toFixed(2);
    }
    return 0;
  }

  getHorarioInicioHoy(): void {
    const inicios = this.recorridosHoy.map(
      (recorrido) =>
        new Date(recorrido.fecha_hora_inicio).getHours() * 100 +
        new Date(recorrido.fecha_hora_inicio).getMinutes()
    );

    if (inicios) {
      const horaMinima = Math.min(...inicios);
      let hora = String(Math.floor(horaMinima / 100));
      let minutos = String(horaMinima % 100);
      hora === 'Infinity' ? (hora = '-') : hora;
      hora === '-Infinity' ? (hora = '-') : hora;
      minutos === 'NaN' ? (minutos = '-') : minutos;
      this.horarioInicio = hora + ':' + minutos;
    }
  }

  getHorarioFinHoy(): void {
    const fines = this.recorridosHoy.map(
      (recorrido) =>
        new Date(recorrido.fecha_hora_fin).getHours() * 100 +
        new Date(recorrido.fecha_hora_fin).getMinutes()
    );

    if (fines) {
      const horaMaxima = Math.max(...fines);
      let hora = String(Math.floor(horaMaxima / 100));
      let minutos = String(horaMaxima % 100);
      hora === 'Infinity' ? (hora = '-') : hora;
      hora === '-Infinity' ? (hora = '-') : hora;
      minutos === 'NaN' ? (minutos = '-') : minutos;
      this.horarioFin = hora + ':' + minutos;
    }
  }

  getTiempoTranscurrido() {
    const inicios = this.recorridosUsuario.map(
      (recorrido) => new Date(recorrido.fecha_hora_inicio)
    );
    const fines = this.recorridosUsuario.map(
      (recorrido) => new Date(recorrido.fecha_hora_fin)
    );

    if (inicios && fines) {
      let iniciosAscendente = inicios.sort((a, b) => {
        return a.getTime() - b.getTime();
      });

      let finesAscendente = fines.sort((x, y) => {
        return x.getTime() - y.getTime();
      });
      const inicioRecorridos = iniciosAscendente[0];
      const finRecorridos = finesAscendente.pop();

      if (inicioRecorridos && finRecorridos) {
        const tiempo = this.msDias(
          finRecorridos!.getTime() - inicioRecorridos.getTime()
        );

        this.dias = tiempo.dias;
        this.horas = tiempo.horas;
        this.minutos = tiempo.minutos;
      }
    }
  }

  msDias(milisegundos: number): {
    dias: number;
    horas: number;
    minutos: number;
  } {
    const segundosEnUnMinuto = 60;
    const segundosEnUnaHora = 60 * segundosEnUnMinuto;
    const segundosEnUnDia = 24 * segundosEnUnaHora;

    const dias = Math.floor(milisegundos / (1000 * segundosEnUnDia));
    const horas = Math.floor(
      (milisegundos % (1000 * segundosEnUnDia)) / (1000 * segundosEnUnaHora)
    );
    const minutos = Math.floor(
      (milisegundos % (1000 * segundosEnUnaHora)) / (1000 * segundosEnUnMinuto)
    );

    return { dias, horas, minutos };
  }

  createMap() {
    const idCiudad = this.userService.usuarioActivo().id_ciudad;
    this.ciudadService.getCiudadbyId(idCiudad).subscribe((ciudad: Ciudad) => {
      if (ciudad) {
        const centro = ciudad.ubicacion_google_maps.centro;
        const zoom = ciudad.ubicacion_google_maps.zoom;
        if (centro && zoom) {
          var mapOptions = {
            zoom: zoom,
            center: centro,
            disableDefaultUI: false,
            fullscreenControl: true,
          };
          var mapCreado = new google.maps.Map(
            document.getElementById('map-panel')!,
            mapOptions
          );
          this.map = mapCreado;
        }
      }
    });
  }

  verHistorial() {
    this.router.navigate(['/historial-pagos']);
  }
}
