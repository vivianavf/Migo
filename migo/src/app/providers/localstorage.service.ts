import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private vehiculosLocalStorage : Vehiculo[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  guardarVehiculoLocalStorage(vehiculo: Vehiculo){
      this.vehiculosLocalStorage.push(vehiculo);
      console.log("El vehiculo ha sido guardado", vehiculo);
  }

  obtenerVehiculosLocalStorage(){
    return this.vehiculosLocalStorage;
  }
}
