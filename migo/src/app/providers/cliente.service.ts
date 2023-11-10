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

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL + this.formato);
  }

  getClientbyId(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL + id + '/' + this.formato);
  }

  // actualizarPassword(id: number, password: any): Observable<any>{
  //   return this.http.patch(this.baseURL+id, password);
  // }

  crearCliente(cliente: Client): Observable<any> {
    return this.http.post(this.baseURL, cliente);
  }

  ingresarCliente(cliente: any) {
    if (cliente) {
      localStorage.setItem('cedula_cliente', cliente.cedula_cliente);
      localStorage.setItem('nombre', cliente.nombre);
      localStorage.setItem('apellido', cliente.apellido);
      localStorage.setItem('fecha_nacimiento', cliente.fecha_nacimiento);
      localStorage.setItem('email_cliente', cliente.email);
      localStorage.setItem('sexo', cliente.sexo.toString());
      localStorage.setItem('telefono', cliente.telefono);
      localStorage.setItem('estado', cliente.estado.toString());
    }
  }
  clienteActivo() {
    const clienteactivo ={
      cedula_cliente: localStorage.getItem('cedula_cliente'),
      nombre: localStorage.getItem('nombre'),
      apellido: localStorage.getItem('apellido'),
      fecha_nacimiento: localStorage.getItem('fecha_nacimiento'),
      email: localStorage.getItem('email_cliente'),
      sexo: localStorage.getItem('sexo'),
      telefono: localStorage.getItem('telefono'),
      estado: Number(localStorage.getItem('estado'))
    };
    return clienteactivo;
  }
}
