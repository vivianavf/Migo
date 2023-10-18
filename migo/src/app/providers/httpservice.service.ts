import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  //Methods
  private baseURL = 'http://migoadvs.pythonanywhere.com/Database/Database/usuarios/';
  private formato = '?format=json'
  // "testing123"
  // "migoadstesting_@outlook.com"
  constructor(
    private http: HttpClient,
  ) { }

  requestCall(datos: any){
    return this.http.post(this.baseURL, datos)
  }
}
