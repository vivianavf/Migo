import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo';
import { MarcaVehiculo } from '../interfaces/marca-vehiculo';

@Injectable({
  providedIn: 'root'
})
export class MarcaVehiculoService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/marcasvehiculos/';
  private formato = '?format=json'

  constructor(
    private http: HttpClient,
  ) { }

  getMarcas():Observable<any[]>{
    var respuesta = this.http.get<any[]>(this.baseURL+this.formato);
    return respuesta;
  }

  getMarcabyId(id: number):Observable<MarcaVehiculo>{
    return this.http.get<MarcaVehiculo>(this.baseURL+id+"/"+this.formato);
  }
}
