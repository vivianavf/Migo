import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ChoferService } from './chofer.service';
import { ClienteService } from './cliente.service';

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

  constructor(
    private http: HttpClient,
    private choferService: ChoferService,
    private clienteService: ClienteService
  ) {}

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
    const body = {
      "contrasena": password,
    }
    return this.http.patch(this.baseURL + id, body);
  }

  actualizarUbicacion(id: number, id_ciudad: number, id_pais: number): Observable<any> {
    const body = {
      "id_pais": id_pais,
      "id_ciudad": id_ciudad,
    }
    return this.http.patch(this.baseURL + id, body);
  }
  
  // actualizarCiudad(id:number, id_ciudad: number): Observable<any>{
  //   const body = {
  //     "id_ciudad": id_ciudad,
  //   }
  //   return this.http.patch(this.baseURL + id, body);
  // }

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
      localStorage.setItem('usuario_fecha_modificacion', user.fecha_modificacion);
      localStorage.setItem('usuario_rol', user.rol_usuario.toString());
      localStorage.setItem('usuario_id_pais', user.id_pais.toString());
      localStorage.setItem('usuario_id_ciudad', user.id_ciudad.toString());
      localStorage.setItem('token_notificacion', user.token_notificacion.toString());
    }
  }

  ingresarPais(id_pais: string){
    localStorage.setItem('usuario_id_pais', id_pais.toString());
  }

  ingresarCiudad(id_ciudad: string){
    localStorage.setItem('usuario_id_ciudad', id_ciudad.toString());
  }

  enviarToken(token: string, id: number): Observable<any> {
    return this.http.put(this.baseURL + id, { 'email':localStorage.getItem('usuario_email'), 'contrasena':localStorage.getItem('usuario_contrasena'), 'rol_usuario':localStorage.getItem('usuario_rol') , 'token_notificacion': token});
  }

  usuarioActivo() {
    const usuarioactivo: User = {
      id_usuario: Number(localStorage.getItem('usuario_id')),
      estado: Number(localStorage.getItem('usuario_estado')),
      email: localStorage.getItem('usuario_email')!,
      placa: localStorage.getItem('usuario_placa')!,
      contrasena: localStorage.getItem('usuario_contrasena')!,
      fecha_creacion: localStorage.getItem('usuario_fecha_creacion')!,
      fecha_modificacion: localStorage.getItem('usuario_fecha_modificacion')!,
      rol_usuario: Number(localStorage.getItem('usuario_rol'))!,
      token_notificacion: localStorage.getItem('token_notificacion')!,
      id_pais: Number(localStorage.getItem('usuario_id_pais')),
      id_ciudad: Number(localStorage.getItem('usuario_id_ciudad')),
    };
    return usuarioactivo;
    // return this.user;
  }

  sexoString(sexo: number): string {
    switch (sexo) {
      case 1:
        return 'Masculino';
        break;
      case 2:
        return 'Femenino';
        break;
      case 3:
        return 'Prefiero No Decir';
        break;
    }

    return '';
  }

  /* esChoferOCliente */
  /* Devuelve un objeto Chofer, si el usuario activo es un chofer */
  /* Devuelve un objeto Cliente, si el usuario activo es un cliente */

  esChoferOCliente() {
    switch (this.usuarioActivo().rol_usuario) {
      case 2: //es chofer
      console.log(this.choferService.choferActivo())
        return {
          nombre: this.choferService.choferActivo().nombre.toString(),
          apellido: this.choferService.choferActivo().apellido.toString(),
          email: this.usuarioActivo().email,
          cedula: this.choferService.choferActivo().cedula_chofer.toString(),
          fecha_nacimiento: this.choferService.choferActivo().fecha_nacimiento.toString(),
          telefono: 'No Aplica',
          sexo: this.sexoString(this.choferService.choferActivo().sexo),
          fecha_creacion: this.usuarioActivo().fecha_creacion!,
        };
        break;
      case 5: //es cliente
        return {
          nombre: this.clienteService.clienteActivo().nombre.toString(),
          apellido: this.clienteService.clienteActivo().apellido.toString(),
          email: this.usuarioActivo().email,
          cedula: this.clienteService.clienteActivo().cedula_cliente.toString(),
          fecha_nacimiento: this.clienteService.clienteActivo().fecha_nacimiento.toString(),
          telefono: this.clienteService.clienteActivo().telefono,
          sexo: this.sexoString(this.clienteService.clienteActivo().sexo),
          fecha_creacion: this.usuarioActivo().fecha_creacion,
        };
        break;
    }

    return {
      nombre: '...',
      apellido: '...',
      email: '...',
      cedula: '...',
      fecha_nacimiento: '...',
      telefono: '...',
      sexo: '...',
      fecha_creacion: '...'
    };
  }
}
