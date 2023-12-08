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

  clearNotificaciones(notifId: string, notificacion: Notificacion){
    var body = {
      "id_notificacion": notificacion.id_notificacion,
      "titulo": notificacion.titulo,
      "descripcion": notificacion.descripcion,
      "fecha_creacion": notificacion.fecha_creacion,
      "fecha_fin": notificacion.fecha_fin,
      "imagen": notificacion.imagen,
      "frecuencia_envio": notificacion.frecuencia_envio,
      "id_campana": notificacion.id_campana,
      "fecha_modificacion": notificacion.fecha_modificacion,
      "estado": 2
    }
    return this.http.put(this.baseURL+notifId, body)
  }

  setNotificaciones(notifId: string, notificacion: Notificacion){
    var body = {
      "id_notificacion": notificacion.id_notificacion,
      "titulo": notificacion.titulo,
      "descripcion": notificacion.descripcion,
      "fecha_creacion": notificacion.fecha_creacion,
      "fecha_fin": notificacion.fecha_fin,
      "imagen": notificacion.imagen,
      "frecuencia_envio": notificacion.frecuencia_envio,
      "id_campana": notificacion.id_campana,
      "fecha_modificacion": notificacion.fecha_modificacion,
      "estado": 1
    }
    return this.http.put(this.baseURL+notifId, body)
  }
}
