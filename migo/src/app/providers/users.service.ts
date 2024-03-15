import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

/* Servicio para el LOGIN*/
/* Obtener listas de usuarios */
/* Buscar un usuario por id */
export class UsersService {
  // private URLproxy = 'https://cors-anywhere.herokuapp.com/'

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/usuarios/';
  private formato = '?format=json';
  // private user!: User;
  public usersObtenidos: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    var respuesta = this.http.get<User[]>(this.baseURL + this.formato);
    respuesta.forEach((users) => {
      this.usersObtenidos = users;
    });
    return respuesta;
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + id + '/' + this.formato);
  }

  actualizarPassword(id: number, password: any): Observable<any> {
    return this.http.patch(this.baseURL + id, password);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.baseURL, usuario);
  }

  getIDNuevoUsuario(): number {
    this.getUsers().subscribe((response) => {});
    let ultimoID =
      this.usersObtenidos[this.usersObtenidos.length - 1].id_usuario;
    var nuevoID = ultimoID + 1;
    var busquedaID = this.usersObtenidos.find(
      ({ id_usuario }) => id_usuario === nuevoID
    );
    while (busquedaID) {
      busquedaID = this.usersObtenidos.find(
        ({ id_usuario }) => id_usuario === nuevoID + 1
      );
      nuevoID++;
    }
    return nuevoID;
  }

  ingresarUsuario(user: any) {
    if (user) {
      // this.user = user;
      localStorage.setItem('usuario_id', user.id_usuario.toString());
      localStorage.setItem('usuario_estado', user.estado.toString());
      localStorage.setItem('usuario_email', user.email);
      localStorage.setItem('usuario_placa', user.placa);
      localStorage.setItem('usuario_contrasena', user.contrasena);
      localStorage.setItem('usuario_fecha_creacion', user.fecha_creacion);
      localStorage.setItem(
        'usuario_fecha_modificacion',
        user.fecha_modificacion
      );
      localStorage.setItem('usuario_rol', user.rol_usuario.toString());
    }
  }
  usuarioActivo() {
    const usuarioactivo = {
      id_usuario: Number(localStorage.getItem('usuario_id')),
      estado: Number(localStorage.getItem('usuario_estado')),
      email: localStorage.getItem('usuario_email'),
      placa: localStorage.getItem('usuario_placa'),
      contrasena: localStorage.getItem('usuario_contrasena'),
      fecha_creacion: localStorage.getItem('usuario_fecha_creacion'),
      fecha_modificacion: localStorage.getItem('usuario_fecha_modificacion'),
      rol_usuario: Number(localStorage.getItem('usuario_rol')),
    };
    return usuarioactivo;
    // return this.user;
  }
}
