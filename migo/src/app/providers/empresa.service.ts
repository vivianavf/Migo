import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/empresas/';
  private formato = '?format=json'
  // private empresa!: Empresa;

  constructor(
    private http: HttpClient,
  ) { }

  getEmpresas():Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.baseURL+this.formato);
  }

  getEmpresabyId(id: number):Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.baseURL+id+"/"+this.formato);
  }

  crearEmpresa(empresa: Empresa): Observable<any>{
    return this.http.post(this.baseURL, empresa);
  }
}