import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/paises/';
  private formato = '?format=json';
  public paisesObtenidos : Pais[] = [];

  constructor(private http: HttpClient) { }

  getPaises(): Observable<Pais[]> {
    var respuesta = this.http.get<Pais[]>(this.baseURL+this.formato);
    respuesta.forEach((paises)=>{
      this.paisesObtenidos = paises;
    })
    return respuesta;
  }

  getPaisbyId(id?: number): Observable<Pais> {
    return this.http.get<Pais>(this.baseURL + id + '/' + this.formato);
  }
}
