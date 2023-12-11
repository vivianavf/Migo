import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

/* Servicio para el LOGIN*/
/* Obtener listas de usuarios */
/* Buscar un usuario por id */

export class UsersService {

  // private URLproxy = 'https://cors-anywhere.herokuapp.com/'

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/usuarios/';
  private formato = '?format=json'
  // private user!: User;
  public usersObtenidos: User[] = [];

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    var respuesta = this.http.get<User[]>(this.baseURL+this.formato);
    respuesta.forEach((users)=>{
      this.usersObtenidos = users;
    })
    return respuesta;
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL+id+"/"+this.formato);
  }

  actualizarPassword(id: number, password: any): Observable<any>{
    return this.http.patch(this.baseURL+id, password);
  }

  crearUsuario(usuario: User): Observable<any>{
    return this.http.post(this.baseURL, usuario);
  }

  ingresarUsuario(user: any){
    if(user){
      // this.user = user;
      localStorage.setItem("id_usuario", user.id_usuario.toString())
      localStorage.setItem("estado_usuario", user.estado.toString())
      localStorage.setItem("email_usuario", user.email)
      localStorage.setItem("placa", user.placa)
      localStorage.setItem("contrasena", user.contrasena)
      localStorage.setItem("fecha_creacion", user.fecha_creacion)
      localStorage.setItem("fecha_modificacion", user.fecha_modificacion)
      localStorage.setItem("rol_usuario", user.rol_usuario.toString())
    }
  }
  usuarioActivo(){
    const usuarioactivo ={
      id_usuario: Number(localStorage.getItem("id_usuario")),
    estado: Number(localStorage.getItem("estado_usuario")),
    email: localStorage.getItem("email_usuario"),
    placa: localStorage.getItem("placa"),
    contrasena: localStorage.getItem("contrasena"),
    fecha_creacion: localStorage.getItem("fecha_creacion"),
    fecha_modificacion: localStorage.getItem("fecha_modificacion"),
    rol_usuario: Number(localStorage.getItem("rol_usuario")),
    };
    return usuarioactivo;
    // return this.user;
  }

}
