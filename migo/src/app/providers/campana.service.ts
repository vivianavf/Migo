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

  constructor(
    private http: HttpClient,
  ) { }

  getCampanas():Observable<Campana[]>{
    return this.http.get<Campana[]>(this.baseURL+this.formato);
  }

  getCampanabyId(id: number):Observable<Campana[]>{
    return this.http.get<Campana[]>(this.baseURL+id+"/"+this.formato);
  }

  crearCampana(campana: Campana): Observable<any>{
    return this.http.post(this.baseURL, campana);
  }

}
