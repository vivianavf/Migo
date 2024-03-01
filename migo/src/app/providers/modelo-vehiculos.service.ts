import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloVehiculo } from '../interfaces/modelo-vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ModeloVehiculosService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/modelosvehiculos/';
  private formato = '?format=json'

  constructor(
    private http: HttpClient,
  ) { }

  getModelos():Observable<any[]>{
    var respuesta = this.http.get<any[]>(this.baseURL+this.formato);
    return respuesta;
  }

  getModelobyId(id: number):Observable<ModeloVehiculo>{
    return this.http.get<ModeloVehiculo>(this.baseURL+id+"/"+this.formato);
  }
}
