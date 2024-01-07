import { Injectable } from '@angular/core';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ElegirVehiculoService {

  public vehiculoElegido!: Vehiculo | null;

  constructor() {}

  sendVehiculo(vehiculo: Vehiculo){
    this.vehiculoElegido = vehiculo;
  }

  getVehiculo(){
    if(this.vehiculoElegido){
      return this.vehiculoElegido
    }else{
      console.log("No Hay un Vehiculo Elegido")
      return null;
    }
  }

  eliminarVehiculo(){
    this.vehiculoElegido = null;
  }

}
