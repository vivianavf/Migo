import { Injectable } from '@angular/core';
import { Sector } from '../interfaces/sector';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/sectores/';
  private formato = '?format=json'
  private sector !: Sector;
  public sectoresObtenidos: Sector[] = [];

  getSectores():Observable<Sector[]>{
    var respuesta = this.http.get<Sector[]>(this.baseURL+this.formato);
    respuesta.forEach((sectores)=>{
      this.sectoresObtenidos = sectores;
    })
    return respuesta;
  }

  getSectorbyId(id: number):Observable<Sector>{
    return this.http.get<Sector>(this.baseURL+id+"/"+this.formato)
  }
  
}
