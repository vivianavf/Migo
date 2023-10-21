import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  //Methods
  private baseURL = 'http://migoadvs.pythonanywhere.com/Database/send_email/';
  // "testing123"
  // "migoadstesting_@outlook.com"
  constructor(
    private http: HttpClient,
  ) { }

  requestCall(datos: any){
    console.log(datos)
    return this.http.post(this.baseURL, datos)
  }
}
