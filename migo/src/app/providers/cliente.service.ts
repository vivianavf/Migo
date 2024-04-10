import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/clientes/';
  private formato = '?format=json';
  public clientesObtenidos : Client[] = [];

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    var respuesta = this.http.get<Client[]>(this.baseURL+this.formato);
    respuesta.forEach((clientes)=>{
      this.clientesObtenidos = clientes;
    })
    return respuesta;
  }

  getClientbyId(id?: number): Observable<Client> {
    return this.http.get<Client>(this.baseURL + id + '/' + this.formato);
  }

  // actualizarPassword(id: number, password: any): Observable<any>{
  //   return this.http.patch(this.baseURL+id, password);
  // }

  crearCliente(cliente: Client): Observable<any> {
    return this.http.post(this.baseURL, cliente);
  }

  ingresarCliente(cliente: Client) {
    if (cliente) {
      localStorage.setItem('cliente_id', cliente.id_cliente!.toString());
      localStorage.setItem('cliente_cedula', cliente.cedula_cliente);
      localStorage.setItem('cliente_nombre', cliente.nombre);
      localStorage.setItem('cliente_apellido', cliente.apellido);
      localStorage.setItem('cliente_fecha_nacimiento', cliente.fecha_nacimiento);
      localStorage.setItem('cliente_email', cliente.email);
      localStorage.setItem('cliente_sexo', cliente.sexo.toString());
      localStorage.setItem('cliente_telefono', cliente.telefono);
      localStorage.setItem('cliente_estado', cliente.estado.toString());
      localStorage.setItem('cliente_id_ciudad', cliente.id_ciudad.toString());
      localStorage.setItem('cliente_id_pais', cliente.id_pais.toString());
    }
  }
  clienteActivo() {
    const clienteactivo = <Client>{
      id_cliente: Number(localStorage.getItem('cliente_id')),
      cedula_cliente: localStorage.getItem('cliente_cedula'),
      nombre: localStorage.getItem('cliente_nombre'),
      apellido: localStorage.getItem('cliente_apellido'),
      fecha_nacimiento: localStorage.getItem('cliente_fecha_nacimiento'),
      email: localStorage.getItem('cliente_email'),
      sexo: Number(localStorage.getItem('cliente_sexo')),
      telefono: localStorage.getItem('cliente_telefono'),
      estado: Number(localStorage.getItem('cliente_estado')),
      id_usuario: Number(localStorage.getItem('usuario_id')),
      id_ciudad: Number(localStorage.getItem('cliente_id_ciudad')),
      id_pais: Number(localStorage.getItem('cliente_id_pais')),
    };
    return clienteactivo;
  }
}
