import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Pais } from 'src/app/interfaces/pais';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/providers/users.service';
import { FormsModule } from '@angular/forms';
import { PaisService } from 'src/app/providers/pais.service';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { GlobalServiceService } from 'src/app/providers/global-service.service';

interface Position {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-mapa-cambiar-ubicacion',

  templateUrl: './mapa-cambiar-ubicacion.component.html',
  styleUrls: ['./mapa-cambiar-ubicacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule],
  providers: [FormsModule],
  standalone: true,
})
export class MapaCambiarUbicacionComponent implements OnInit {

  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  ciudadesFiltradas: Ciudad[] = [];

  paisInput: string = '';
  ciudadInput: string = '';

  paisActual: string = '';
  ciudadActual: string = '';

  constructor(
    private userService: UsersService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private globalService: GlobalServiceService,
  ) {}

  ngOnInit() {
    this.generarDatos();
  }

  generarDatos(){
    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
    });
    this.ciudadService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });

    this.paisService.getPaisbyId(this.userService.usuarioActivo().id_pais).subscribe((pais)=>{
      this.paisActual = pais.nombre;
    })

    this.ciudadService.getCiudadbyId(this.userService.usuarioActivo().id_ciudad).subscribe((ciudad)=>{
      this.ciudadActual = ciudad.nombre;
    })
  }

  async cambiarUbicacion() {
    if (this.paisInput && this.ciudadInput) {
      const id_usuario = this.userService.usuarioActivo().id_usuario;

      this.userService
        .actualizarPais(id_usuario, Number(this.paisInput))
        .subscribe((response: User) => {
          this.userService.ingresarPais(this.paisInput);
        });
      this.userService
        .actualizarCiudad(id_usuario, Number(this.ciudadInput))
        .subscribe((response) => {
          this.userService.ingresarCiudad(this.ciudadInput);
        });

      this.modalCtrl.dismiss();
      this.navCtrl.navigateRoot('/home');

    } else {
      this.modalCtrl.dismiss();
    }
  }

  paisChange(e: any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.filtrarCiudades(e.detail.value);
    this.paisInput = e.detail.value;
  }

  ciudadChange(e: any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    // this.filtrarCiudades(e.detail.value);
    this.ciudadInput = e.detail.value;
  }

  filtrarCiudades(id: number) {
    this.ciudadesFiltradas = [];
    this.ciudades.forEach((ciudad) => {
      if (ciudad.id_pais == id) {
        this.ciudadesFiltradas.push(ciudad);
      }
    });
    // this.ciudadesFiltradas = [];
  }

}
