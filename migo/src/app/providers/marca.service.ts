import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/empresas/';
  private formato = '?format=json'
  private marca : any;

  constructor(
    private http: HttpClient,
  ) { }

  getMarcas():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.baseURL+this.formato);
  }

  getMarcabyId(id: number):Observable<Marca[]>{
    return this.http.get<Marca[]>(this.baseURL+id+"/"+this.formato);
  }

  crearCampana(marca: Marca): Observable<any>{
    return this.http.post(this.baseURL, marca);
  }

}
