import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campana } from '../interfaces/campana';
import { FormularioAplicacion } from '../interfaces/formulario-aplicacion';


@Injectable({
  providedIn: 'root'
})
export class CampanaService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/campaniaspublicitarias/';
  private formato = '?format=json'
  private campana : any;
  public campanasObtenidas: Campana[] = [];
  private campanaActiva!: Campana;
  private solicitud!: FormularioAplicacion;

  constructor(
    private http: HttpClient,
  ) { }

  getCampanas():Observable<Campana[]>{
    var respuesta = this.http.get<Campana[]>(this.baseURL+this.formato);
    respuesta.forEach((campanas)=>{
      this.campanasObtenidas = campanas;
    })
    return respuesta;
  }

  getCampanabyId(id: number):Observable<Campana>{
    return this.http.get<Campana>(this.baseURL+id+"/"+this.formato);
  }

  crearCampana(campana: Campana): Observable<any>{
    return this.http.post(this.baseURL, campana);
  }

  setCampanaActual(campana: Campana){
    this.campana = campana;
  }

  getCampanaActual(): Campana{
    return this.campana;
  }

  setInfoCampanaActiva(campana: Campana, solicitud: FormularioAplicacion){
    this.campanaActiva = campana;
    this.solicitud = solicitud;
  }

  getInfoCampanaActiva():[campana: Campana, solicitud: FormularioAplicacion]{
    return [this.campanaActiva, this.solicitud];
  }

}
