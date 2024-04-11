import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chofer } from '../interfaces/chofer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/choferes/';
  private formato = '?format=json';
  public choferesObtenidos : Chofer[] = [];

  constructor(private http: HttpClient) { }

  getChoferes(): Observable<Chofer[]> {
    var respuesta = this.http.get<Chofer[]>(this.baseURL+this.formato);
    respuesta.forEach((choferes)=>{
      this.choferesObtenidos = choferes;
    })

    return respuesta;
  }

  getIDNuevoChofer(): number{
    this.getChoferes().subscribe((response)=>{});
    return 1;
  }

  getChoferbyId(id?: number): Observable<Chofer> {
    return this.http.get<Chofer>(this.baseURL + id + '/' + this.formato);
  }

  crearChofer(chofer: Chofer): Observable<any> {
    return this.http.post(this.baseURL, chofer);
  }

  ingresarChofer(chofer: Chofer) {
    console.log(chofer);
    if (chofer) {
      if(chofer.id_chofer){
        localStorage.setItem('chofer_id', chofer.id_chofer.toString());
      }
      localStorage.setItem('chofer_cedula', chofer.cedula_chofer.toString());
      localStorage.setItem('chofer_nombre', chofer.nombre.toString());
      localStorage.setItem('chofer_apellido', chofer.apellido.toString());
      localStorage.setItem('chofer_fecha_nacimiento', chofer.fecha_nacimiento.toString());
      localStorage.setItem('chofer_sexo', chofer.sexo.toString());
      localStorage.setItem('chofer_estado', chofer.estado.toString());
      localStorage.setItem('chofer_id_ciudad', chofer.id_ciudad.toString());
      localStorage.setItem('chofer_id_pais', chofer.id_pais.toString());
    }
  }
  choferActivo() {
    const choferactivo = <Chofer>{
      id_chofer: Number(localStorage.getItem('chofer_id')),
      cedula_chofer: localStorage.getItem('chofer_cedula'),
      nombre: localStorage.getItem('chofer_nombre'),
      apellido: localStorage.getItem('chofer_apellido'),
      fecha_nacimiento: new Date(localStorage.getItem('chofer_fecha_nacimiento')!),
      sexo: Number(localStorage.getItem('chofer_sexo')),
      estado: Number(localStorage.getItem('chofer_estado')),
      id_usuario: Number(localStorage.getItem('usuario_id')),
      id_ciudad: Number(localStorage.getItem('chofer_id_ciudad')),
      id_pais: Number(localStorage.getItem('chofer_id_pais')),
    };
    return choferactivo;
  }


}
