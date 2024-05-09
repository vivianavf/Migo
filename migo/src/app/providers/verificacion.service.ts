import { Injectable } from '@angular/core';
import { Verificacion } from '../interfaces/verificacion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/verificacionesconductorcampana/';
  private formato = '?format=json';
  private verificacion!: Verificacion;
  public verificacionesObtenidas: Verificacion[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getVerificaciones(): Observable<Verificacion[]> {
    const respuesta = this.http.get<Verificacion[]>(this.baseURL + this.formato);
    respuesta.forEach((verificaciones) => {
      this.verificacionesObtenidas = verificaciones;
    });
    return respuesta;
  }

  getVerificacionbyId(id: number): Observable<Verificacion> {
    return this.http.get<Verificacion>(this.baseURL + id + '/' + this.formato);
  }

  createVerificacion(verificacion: Verificacion) {
    console.log("verificacion - crear,",verificacion)
    const formData = new FormData();

    // formData.append('id_vehiculo', vehiculo.id_vehiculo!.toString());
    formData.append('cedula_conductor', verificacion.cedula_conductor.toString());
    formData.append('fecha_registro', verificacion.fecha_registro.toString());
    formData.append('tipo_verificacion', verificacion.tipo_verificacion.toString());
    formData.append(
      'imagen_evidencia', verificacion.imagen_evidencia, 'evidencia-'+verificacion.cedula_conductor+verificacion.fecha_registro.toString()+'.png');
    formData.append('estado', '1');
    formData.append('id_campana', verificacion.id_campana.toString())

    return this.http.post(this.baseURL, formData);
  }
}
