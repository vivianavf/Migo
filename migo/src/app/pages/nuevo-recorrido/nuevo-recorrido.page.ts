import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campana } from 'src/app/interfaces/campana';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { TabsService } from 'src/app/providers/tabs.service';
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
  currentTime: any = {}

  campana!: Campana;
  vehiculo!: Vehiculo;

  mapaRecorrido!: google.maps.Map;
  centroRecorrido: google.maps.LatLngLiteral = {lat: 30, lng: -110};

  //variables
  fechaInicio = "..."
  kms = 0
  dineroRecaudado = 0
  // timer = "00:00"

  constructor(
    private router: Router,
    private tabService: TabsService,
  ) { 
  }

  ionViewDidEnter(){
    this.tabService.hideTabs();
    if(!(this.campana && this.vehiculo)){
      this.generarDatos();
    }
  }

  ngOnInit() {
    this.timer = new Timer({ startTimestamp: new Date().getTime() });
    this.startTimer();
    this.generarDatos();
  }

  generarDatos(){
    this.campana = JSON.parse(localStorage.getItem('campana-recorrido')!);
    this.vehiculo = JSON.parse(localStorage.getItem('vehiculo-recorrido')!);
    console.log("OBJETOS JSON", this.campana, this.vehiculo);
    this.tabService.hideTabs();
    this.dibujarMapa();
  }

  startTimer(){
    this.timer.start();

    this.interValidId = setInterval(()=>{
      this.currentTime = this.timer.time();
    }, 1000)
  }

  stopTimer(){
    this.timer.stop();

    if(this.interValidId){
      clearInterval(this.interValidId);
      this.interValidId = undefined;
    }
  }

  dibujarMapa(){
    console.log("creando mapa...")

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.mapaRecorrido = new google.maps.Map(document.getElementById("nuevo-recorrido") as HTMLElement, {
            center: pos,
            zoom: 15,
          });

          new google.maps.Marker({
            position: pos,
            map: this.mapaRecorrido,
            title: "Ubicacion actual!",
          });
        
    
        }
      )
    }
  
  }

  finalizarRecorrido(){
    this.tabService.showTabs();
    this.router.navigate(['/panel'])
    localStorage.removeItem('recorrido')
    localStorage.removeItem('campana-recorrido');
    localStorage.removeItem('vehiculo-recorrido');
    this.stopTimer();
  }

}
