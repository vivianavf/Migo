import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TallerBrandeo } from '../interfaces/taller-brandeo';

@Injectable({
  providedIn: 'root'
})
export class TallerBrandeoService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/tallerbrandeos/';
  private formato = '?format=json';
  // private user!: User;
  public talleresObtenidos: TallerBrandeo[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getTalleres(): Observable<TallerBrandeo[]> {
    var respuesta = this.http.get<TallerBrandeo[]>(this.baseURL + this.formato);
    respuesta.forEach((talleres) => {
      this.talleresObtenidos = talleres;
    });
    return respuesta;
  }

  getTallerById(id: number): Observable<TallerBrandeo> {
    return this.http.get<TallerBrandeo>(this.baseURL + id + '/' + this.formato);
  }

  crearTaller(taller: any): Observable<any> {
    return this.http.post(this.baseURL, taller);
  }

  eliminarTaller(id:number){
    return this.http.delete(this.baseURL+id+'/');
  }

}
