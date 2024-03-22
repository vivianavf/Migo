import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/ciudades/';
  private formato = '?format=json';
  public ciudadesObtenidas : Ciudad[] = [];

  constructor(private http: HttpClient) { }

  getCiudades(): Observable<Ciudad[]> {
    var respuesta = this.http.get<Ciudad[]>(this.baseURL+this.formato);
    respuesta.forEach((ciudades)=>{
      this.ciudadesObtenidas = ciudades;
    })
    return respuesta;
  }

  getCiudadbyId(id?: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(this.baseURL + id + '/' + this.formato);
  }

  
}
