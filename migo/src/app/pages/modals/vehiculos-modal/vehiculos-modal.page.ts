import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import SwiperCore from 'swiper';
import {Swiper} from 'swiper';
import { IonicSlides } from '@ionic/core';
import { ElegirVehiculoService } from 'src/app/providers/elegir-vehiculo.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculos-modal',
  templateUrl: './vehiculos-modal.page.html',
  styleUrls: ['./vehiculos-modal.page.scss'],
})
export class VehiculosModalPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?:Swiper;

  @Input() idCliente: any;
  swiperModules = [IonicSlides]
  vehiculosCliente: Vehiculo[] = [];

  vehiculoSeleccionado: any;

  hayVehiculos=false;

  constructor(
    private vehiculoService: VehiculoService,
    private elegirVehiculoService: ElegirVehiculoService,
    private modalController: ModalController,
    private navCtrl: NavController,
  ) { }

  elegirVehiculo(vehiculo: any) {
    this.elegirVehiculoService.sendVehiculo(vehiculo);
    this.modalController.dismiss();
  }

  irRegistro(){
    this.navCtrl.navigateRoot('/agregar-vehiculo');
    this.modalController.dismiss();
  }

  ngOnInit() {
    var vehiculosBuscar = this.vehiculoService.getVehiculos().subscribe((data)=>{
      data.forEach((vehiculo)=>{
        if(vehiculo.id_cliente === this.idCliente){
          this.vehiculosCliente.push(vehiculo);
        }
      })

      if(this.vehiculosCliente.length>0){this.hayVehiculos=true}else{this.hayVehiculos=false}
    })
  }

}
