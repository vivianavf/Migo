import { Injectable } from '@angular/core';
import { Publicidad } from '../interfaces/publicidad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/publicidades/';
  private formato = '?format=json';
  public publicidadesObtenidas : Publicidad[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getPublicidades(): Observable<Publicidad[]> {
    var respuesta = this.http.get<Publicidad[]>(this.baseURL+this.formato);
    respuesta.forEach((publicidades)=>{
      this.publicidadesObtenidas = publicidades;
    })
    return respuesta;
  }

  getPublicidadbyId(id: number): Observable<Publicidad> {
    return this.http.get<Publicidad>(this.baseURL + id + '/' + this.formato);
  }

}
