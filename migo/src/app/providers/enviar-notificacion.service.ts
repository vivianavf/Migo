import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class EnviarNotificacionService {

  baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/send_fcm_notification/';

  constructor(
    private http: HttpClient,
    private userService: UsersService, //para el token
  ) { }

  enviarNotificacion(titulo: string, mensaje: string){
    const token = this.userService.usuarioActivo().token_notificacion;

    const notificacion = {
      registration_token: token,
      title: titulo,
      body: mensaje,
    }

    return this.http.post(this.baseURL, notificacion)
  }

    // enviarNotificacion(registration_token, title, body){

  //   bodyR = {
  //     registration_token: "",
  //     title: "",
  //     body: "",
  //   }

  //   return this.http.post("....//Database/send_fcm_notification/", bodyR)
  // }

}
