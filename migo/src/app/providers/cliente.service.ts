import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/clientes/';
  private formato = '?format=json'

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL+this.formato);
  }

  getClientbyId(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL+id+"/"+this.formato);
  }

  // actualizarPassword(id: number, password: any): Observable<any>{
  //   return this.http.patch(this.baseURL+id, password);
  // }

  crearCliente(cliente: Client): Observable<any>{
    return this.http.post(this.baseURL, cliente);
  }
}
