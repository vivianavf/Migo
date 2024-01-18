import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo';

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

  getMarcabyId(id: number):Observable<any>{
    return this.http.get<any>(this.baseURL+id+"/"+this.formato);
  }
}
