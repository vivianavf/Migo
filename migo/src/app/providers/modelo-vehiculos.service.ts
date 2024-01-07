import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloVehiculosService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/modelosvehiculos/';
  private formato = '?format=json'

  constructor(
    private http: HttpClient,
  ) { }

  getModelos():Observable<string[]>{
    var respuesta = this.http.get<any[]>(this.baseURL+this.formato);
    return respuesta;
  }

  getModelobyId(id: number):Observable<any>{
    return this.http.get<any>(this.baseURL+id+"/"+this.formato);
  }
}
