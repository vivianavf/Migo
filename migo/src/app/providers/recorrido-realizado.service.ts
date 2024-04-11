import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecorridoRealizado } from '../interfaces/recorrido-realizado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecorridoRealizadoService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/recorridosrealizados/';
  private formato = '?format=json'
  private recorrido !: RecorridoRealizado;
  public recorridosObtenidos: RecorridoRealizado[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getRecorridos():Observable<RecorridoRealizado[]>{

    return this.http.get<RecorridoRealizado[]>(this.baseURL+this.formato);
  }

  getRecorridobyId(id: number): Observable<RecorridoRealizado>{

    return this.http.get<RecorridoRealizado>(this.baseURL+id+"/"+this.formato)

  }

  crearRecorrido(recorrido: RecorridoRealizado): Observable<any> {
    return this.http.post(this.baseURL, recorrido);
  }

  // eliminarRecorrido(id:number){
  //   return this.http.delete(this.baseURL+id+'/');
  // }


}
