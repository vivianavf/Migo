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
  public marcasObtenidas: Marca[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getMarcas():Observable<Marca[]>{
    var respuesta = this.http.get<Marca[]>(this.baseURL+this.formato);
    respuesta.forEach((marcas)=>{
      this.marcasObtenidas = marcas;
    })
    return respuesta;
  }

  getMarcabyId(id: number):Observable<Marca[]>{
    return this.http.get<Marca[]>(this.baseURL+id+"/"+this.formato);
  }

  crearMarca(marca: Marca): Observable<any>{
    return this.http.post(this.baseURL, marca);
  }

}
