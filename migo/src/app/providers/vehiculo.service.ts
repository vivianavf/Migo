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

  getVehiculobyId(id: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.baseURL + id + '/' + this.formato);
  }

  crearVehiculo(vehiculo: Vehiculo): Observable<any> {

    let config = {
      headers: {
        'enctype': 'multipart/form-data;',
          'Accept': 'multipart/form-data',
          'Content-Type': "multipart/form-data"
      }
  };
  var formData = new FormData();
  formData.append('data', JSON.stringify(vehiculo));

    return this.http.post(this.baseURL, formData, config);
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
