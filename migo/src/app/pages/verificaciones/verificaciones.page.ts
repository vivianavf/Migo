import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificaciones',
  templateUrl: './verificaciones.page.html',
  styleUrls: ['./verificaciones.page.scss'],
})
export class VerificacionesPage implements OnInit {

  // @Input() user!: User;
  // @Input() client!: Client;
  // @Input() campana!: Campana;
  // @Input() vehiculo!: Vehiculo;
  // @Input() marca!: string;
  // @Input() modelo!: string;

  constructor() { }

  ngOnInit() {
  }

  mostrarQR(){
    //// Buscar en la base de datos si es que el documento existe
    //// si esta, simplemente genero un QR y pongo el URL del pdf
    //// en la data del QR


    //// Si no esta, crear un QR con los datos obtenidos:
    //// user, client, campana, vehiculo, marca, modelo
  }

  verificaBrandeo(){
  }

  verificaRecorrido(){}

}
