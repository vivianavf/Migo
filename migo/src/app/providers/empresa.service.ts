import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { CampanaService } from './campana.service';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/empresas/';
  private formato = '?format=json'
  // private empresa!: Empresa;
  public empresasObtenidas: Empresa[] = [];

  constructor(
    private http: HttpClient,
    private campanaService: CampanaService,
  ) { }

  getEmpresas():Observable<Empresa[]>{
    var respuesta = this.http.get<Empresa[]>(this.baseURL+this.formato);
    respuesta.forEach((empresas)=>{
      this.empresasObtenidas = empresas;
    })
    return respuesta;
  }

  getEmpresabyId(id: number):Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.baseURL+id+"/"+this.formato);
  }

  crearEmpresa(empresa: Empresa): Observable<any>{
    return this.http.post(this.baseURL, empresa);
  }

getNumeroCampanasActivas(empresa:Empresa){
    return 0;
  }

  setCampanasActivas(empresa:Empresa){    
    return 0;
  }

  getVehiculos(){}

  getPromediosTarifas(){}

}
