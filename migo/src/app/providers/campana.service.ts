import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campana } from '../interfaces/campana';


@Injectable({
  providedIn: 'root'
})
export class CampanaService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/campaniaspublicitarias/';
  private formato = '?format=json'
  private campana : any;
  public campanasObtenidas: Campana[] = [];
  public campanaActiva!: Campana;

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

  setInfoCampanaActiva(id_campana: number){
    this.getCampanabyId(id_campana).subscribe((campana)=>{
      this.campanaActiva = campana;
    })
  }

  getInfoCampanaActiva():Campana{
    return this.campanaActiva;
  }

}
