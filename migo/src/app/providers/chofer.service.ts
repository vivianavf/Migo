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

    console.log(this.choferesObtenidos);
    console.log(respuesta)
    return respuesta;
  }

  getIDNuevoChofer(): number{
    this.getChoferes().subscribe((response)=>{});
    
    console.log(this.choferesObtenidos)
    console.log(this.choferesObtenidos[this.choferesObtenidos.length - 1])
    // let ultimoID = this.choferesObtenidos[this.choferesObtenidos.length - 1].id_chofer;

    // if(ultimoID){
    // var nuevoID = ultimoID+1;
    // var busquedaID = this.choferesObtenidos.find(({ id_chofer }) => id_chofer === nuevoID);
    // while(busquedaID){
    //   busquedaID = this.choferesObtenidos.find(({ id_chofer }) => id_chofer === nuevoID+1);
    //   nuevoID++;
    // }
    // return nuevoID;}

    return 1;
  }

  getChoferbyId(id?: number): Observable<Chofer> {
    return this.http.get<Chofer>(this.baseURL + id + '/' + this.formato);
  }

  crearChofer(chofer: Chofer): Observable<any> {
    return this.http.post(this.baseURL, chofer);
  }


}
