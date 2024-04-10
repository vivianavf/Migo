import { Injectable } from '@angular/core';
import { EntidadBancaria } from '../interfaces/entidad-bancaria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntidadBancariaService {
  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/entidadesbancarias/';
  private formato = '?format=json';
  public entidadesObtenidas: EntidadBancaria[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  getEntidadesBancarias(): Observable<EntidadBancaria[]> {
    var respuesta = this.http.get<EntidadBancaria[]>(this.baseURL+this.formato);
    respuesta.forEach((entidades)=>{
      this.entidadesObtenidas = entidades;
    })
    return respuesta;
  }

  getEntidadbyId(id: number): Observable<EntidadBancaria> {
    return this.http.get<EntidadBancaria>(this.baseURL + id + '/' + this.formato);
  }
}
