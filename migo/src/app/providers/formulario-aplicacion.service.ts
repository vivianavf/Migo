import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampanaService } from './campana.service';
import { FormularioAplicacion } from '../interfaces/formulario-aplicacion';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class FormularioAplicacionService {

  private baseURL = 'https://migoadvs.pythonanywhere.com/Database/Database/formularioregistrocampana/';
  private formato = '?format=json'
  public formulariosObtenidos ?: FormularioAplicacion[];

  constructor(
    private http: HttpClient,
    private campanaService: CampanaService,
  ) { }


  getFormularios():Observable<FormularioAplicacion[]>{
    var respuesta = this.http.get<FormularioAplicacion[]>(this.baseURL+this.formato);
    respuesta.forEach((formularios)=>{
      this.formulariosObtenidos = formularios;
    })
    return respuesta;
  }

  getFormulariobyId(id: number):Observable<FormularioAplicacion>{
    return this.http.get<FormularioAplicacion>(this.baseURL+id+"/"+this.formato);
  }

  crearFormulario(formulario: FormularioAplicacion): Observable<any>{
    return this.http.post(this.baseURL, formulario);
  }


}
