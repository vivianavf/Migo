import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/vehiculos/';
  private formato = '?format=json';
  private vehiculo!: Vehiculo;
  public vehiculosObtenidos: Vehiculo[] = [];

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<Vehiculo[]> {
    var respuesta = this.http.get<Vehiculo[]>(this.baseURL + this.formato);
    respuesta.forEach((vehiculos) => {
      this.vehiculosObtenidos = vehiculos;
    });
    return respuesta;
  }

  getVehiculobyId(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(this.baseURL + id + '/' + this.formato);
  }

  crearVehiculo(vehiculo: Vehiculo) {
    let config = {
      headers: {
        enctype: 'multipart/form-data;',
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    };

    var formData = new FormData();

    formData.append('id_vehiculo', vehiculo.id_vehiculo!.toString());
    formData.append(
      'telefono_conductor',
      vehiculo.telefono_conductor.toString()
    );
    formData.append('placa', vehiculo.placa.toString());
    formData.append('anio', vehiculo.anio.toString());
    formData.append(
      'categoria_vehiculo',
      vehiculo.categoria_vehiculo.toString()
    );
    formData.append('color_vehiculo', vehiculo.color_vehiculo.toString());
    formData.append('imagen_izq', vehiculo.imagen_izq.webPath!);
    formData.append('imagen_der', vehiculo.imagen_der.path!);
    formData.append('imagen_frontal', vehiculo.imagen_frontal.path!);
    formData.append('imagen_trasera', vehiculo.imagen_trasera.path!);
    formData.append('imagen_techo', vehiculo.imagen_techo.path!);
    formData.append('estado', vehiculo.estado.toString());
    formData.append('id_chofer', vehiculo.id_chofer!.toString());
    formData.append('id_cliente', vehiculo.id_cliente!.toString());
    formData.append('id_marca', vehiculo.id_marca.toString());
    formData.append('id_modelo', vehiculo.id_modelo.toString());

    console.log(formData);

    // return this.http.post(this.baseURL, formData);
  }

  getIDNuevoVehiculo(): number {
    this.getVehiculos().subscribe((response) => {});
    let ultimoID =
      this.vehiculosObtenidos[this.vehiculosObtenidos.length - 1].id_vehiculo;
    if (ultimoID) {
      var nuevoID = ultimoID + 1;
      var busquedaID = this.vehiculosObtenidos.find(
        ({ id_vehiculo }) => id_vehiculo === nuevoID
      );
      while (busquedaID) {
        busquedaID = this.vehiculosObtenidos.find(
          ({ id_vehiculo }) => id_vehiculo === nuevoID + 1
        );
        nuevoID++;
      }

      return nuevoID;
    }

    return 0;
  }

  setVehiculoActual(vehiculo: Vehiculo) {
    this.vehiculo = vehiculo;
  }

  getVehiculoActual() {
    return this.vehiculo;
  }
}
