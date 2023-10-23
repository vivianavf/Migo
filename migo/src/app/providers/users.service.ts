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

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL+this.formato);
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL+id+"/"+this.formato);
  }

  actualizarPassword(id: number, password: any): Observable<any>{
    return this.http.patch(this.baseURL+id, password);
  }

}
