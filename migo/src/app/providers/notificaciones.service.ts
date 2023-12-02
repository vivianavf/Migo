import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../interfaces/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/notificaciones/';
  private formato = '?format=json'
  private notificacion !: Notificacion;

  constructor(
    private http: HttpClient,
  ) { }

  getNotificaciones():Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>(this.baseURL+this.formato)
  }

  getNotificacionbyId(id: number):Observable<Notificacion[]>{
    return this.http.get<Notificacion[]>(this.baseURL+id+"/"+this.formato)
  }
}
