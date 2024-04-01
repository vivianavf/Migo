import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampanaService } from './campana.service';
import { FormularioAplicacion } from '../interfaces/formulario-aplicacion';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root',
})
export class FormularioAplicacionService {
  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/formularioregistrocampana/';
  private formato = '?format=json';
  public formulariosObtenidos?: FormularioAplicacion[];

  constructor(
    private http: HttpClient,
    private campanaService: CampanaService
  ) {}

  getFormularios(): Observable<FormularioAplicacion[]> {
    var respuesta = this.http.get<FormularioAplicacion[]>(
      this.baseURL + this.formato
    );
    respuesta.forEach((formularios) => {
      this.formulariosObtenidos = formularios;
    });
    return respuesta;
  }

  getFormulariobyId(id: number): Observable<FormularioAplicacion> {
    return this.http.get<FormularioAplicacion>(
      this.baseURL + id + '/' + this.formato
    );
  }

  crearFormulario(formulario: FormularioAplicacion): Observable<any> {
    console.log('FORMULARIO', formulario);
    const formData = new FormData();
    formData.append(
      'telefono_conductor',
      formulario.telefono_conductor.toString()
    );
    formData.append('licencia', formulario.licencia); // fileLicencia debe ser el archivo seleccionado
    formData.append('matricula', formulario.matricula); // fileMatricula debe ser el archivo seleccionado
    formData.append(
      'numero_cuenta_bancaria',
      formulario.numero_cuenta_bancaria
    );
    formData.append('cedula', formulario.cedula);
    formData.append('entidad_bancaria', formulario.entidad_bancaria.toString());
    formData.append(
      'tipo_cuenta_bancaria',
      formulario.tipo_cuenta_bancaria.toString()
    );
    formData.append('correo_electronico', formulario.correo_electronico);
    formData.append('fecha_envio', formulario.fecha_envio.toString()); // Convertir a formato ISOString
    formData.append('id_usuario', formulario.id_usuario.toString());
    formData.append('id_campana', formulario.id_campana.toString());
    formData.append('id_ciudad', formulario.id_ciudad.toString());
    formData.append('id_pais', formulario.id_pais.toString());
    formData.append('id_vehiculo', formulario.id_vehiculo.toString());

    return this.http.post(this.baseURL, formData);
  }

  cambiarEstadoFormulario(id: number, estado: string): Observable<any> {
    const body = {
      "estado_solicitud": estado,
    }
    return this.http.patch(this.baseURL + id, body);
  }
}
