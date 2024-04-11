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

@Component({
  selector: 'app-nuevo-recorrido',
  templateUrl: './nuevo-recorrido.page.html',
  styleUrls: ['./nuevo-recorrido.page.scss'],
})
export class NuevoRecorridoPage implements OnInit {
  //timer
  timer!: Timer;
  interValidId: any;
  currentTime: any = {};

  campana!: Campana;
  vehiculo!: Vehiculo;
  usuario!: User;

  mapaRecorrido!: google.maps.Map;
  centroRecorrido: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

  //variables
  fechaInicio!: Date;
  kms = 0;
  dineroRecaudado = 0;
  horaInicio = '...';
  // timer = "00:00"

  constructor(
    private router: Router,
    private tabService: TabsService,
    private enviarNotificacion: EnviarNotificacionService,
    private recorridoService: RecorridoRealizadoService,
    private userService: UsersService,
  ) {}

  ionViewDidEnter() {
    this.tabService.hideTabs();
    if (!(this.campana && this.vehiculo)) {
      this.generarDatos();
    }
  }

  ngOnInit() {
    this.timer = new Timer({ startTimestamp: new Date().getTime() });
    this.startTimer();
    this.generarDatos();
  }

  generarDatos() {
    this.campana = JSON.parse(localStorage.getItem('campana-recorrido')!);
    this.vehiculo = JSON.parse(localStorage.getItem('vehiculo-recorrido')!);
    this.usuario = this.userService.usuarioActivo()!;
    this.fechaInicio = new Date();
    // this.fechaInicio = fechaHoy.split('T')[0];
    // this.horaInicio = fechaHoy.split('T')[1].split('.')[0];

    this.tabService.hideTabs();
    this.dibujarMapa();
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
  }

  dibujarMapa() {
    console.log('creando mapa...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

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
        }
      );
    }
  }

  finalizarRecorrido() {
    this.tabService.showTabs();
    localStorage.removeItem('recorrido');
    localStorage.removeItem('campana-recorrido');
    localStorage.removeItem('vehiculo-recorrido');
    const nuevoRecorrido: RecorridoRealizado = {
      id_vehiculo: this.vehiculo.id_vehiculo!,
      id_usuario: this.usuario.id_usuario,
      id_campana: this.campana.id_campana,
      fecha_hora_inicio: this.fechaInicio,
      fecha_hora_fin: new Date(),
      kilometraje_recorrido: 1,
      dinero_recaudado: 1,
      id_ciudad: this.usuario.id_ciudad,
      id_pais: this.usuario.id_pais,
      estado: 1,
    };

    console.log("recorrido finalizado", nuevoRecorrido)

    // this.recorridoService.crearRecorrido(nuevoRecorrido).subscribe((response) => {
    //   this.router.navigate(['/panel']);
    //   this.stopTimer();
    // });
  }
}
