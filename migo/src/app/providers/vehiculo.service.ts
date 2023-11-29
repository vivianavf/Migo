import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/vehiculos/';
  private formato = '?format=json'
  private vehiculo!: Vehiculo;

  constructor(
    private http: HttpClient,
  ) { }

  getVehiculos():Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.baseURL+this.formato);
  }

  getVehiculobyId(id: number):Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.baseURL+id+"/"+this.formato);
  }

  crearVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.post(this.baseURL, vehiculo);
  }

  setVehiculoActual(vehiculo: Vehiculo){
    this.vehiculo = vehiculo;
  }

  getVehiculoActual(){
    return this.vehiculo;
  }
}
