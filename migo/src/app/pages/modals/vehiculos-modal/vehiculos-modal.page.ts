import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import SwiperCore from 'swiper';
import { Swiper } from 'swiper';
import { IonicSlides } from '@ionic/core';
import { ElegirVehiculoService } from 'src/app/providers/elegir-vehiculo.service';
import { ModalController, NavController } from '@ionic/angular';
import { AgregarVehiculoPage } from '../../agregar-vehiculo/agregar-vehiculo.page';
import { CampanaService } from 'src/app/providers/campana.service';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { ChoferService } from 'src/app/providers/chofer.service';
import { ClienteService } from 'src/app/providers/cliente.service';

@Component({
  selector: 'app-vehiculos-modal',
  templateUrl: './vehiculos-modal.page.html',
  styleUrls: ['./vehiculos-modal.page.scss'],
})
export class VehiculosModalPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  @Input() id!: number;
  @Input() rolUsuario!: number;

  swiperModules = [IonicSlides];
  vehiculosMostrar: Vehiculo[] = [];

  vehiculoSeleccionado: any;

  // hayVehiculos = false;
  loading = true;

  imgRuta = 'https://migoadvs.pythonanywhere.com/vehiculos/';

  component = AgregarVehiculoPage;

  constructor(
    private vehiculoService: VehiculoService,
    private elegirVehiculoService: ElegirVehiculoService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private campanaService: CampanaService,
    private formService: FormularioAplicacionService,
    private navService: NavigationService,
    private choferService: ChoferService,
    private clienteService: ClienteService
  ) {}

  getImageSrc(angulo: string, vehiculo?: Vehiculo) {
    if (vehiculo) {
      const arrayNombreURL = String(vehiculo!.imagen_frontal).split('/');
      const foto = arrayNombreURL[arrayNombreURL.length - 1];
      return this.imgRuta + foto;
    } else {
      return '';
    }
  }

  elegirVehiculo(vehiculo: any) {
    this.elegirVehiculoService.sendVehiculo(vehiculo);
    this.modalController.dismiss();
  }

  irRegistro() {
    this.navService.setPagina('/formulario-aplicacion');
    this.navCtrl.navigateRoot('/agregar-vehiculo');
    this.modalController.dismiss();
  }

  buscarVehiculoFormulario(vehiculo: Vehiculo) {
    //si el vehiculo ya esta en la campana, entonces no deberia salir en la seleccion
    const campanaActual = this.campanaService.getCampanaActual();

    this.formService.getFormularios().subscribe((data) => {
      var formularios = data;
      formularios.forEach((formulario) => {
        if (
          !(
            formulario.id_vehiculo === vehiculo.id_vehiculo &&
            formulario.id_campana === campanaActual.id_campana
          )
        ) {
          this.vehiculosMostrar.push(vehiculo);
          console.log('SU vehiculo puede registrarse en la campana');
          //filtar por pais y ciudad
        } else {
          console.log(
            'su vehiculo ya se encuentra registrado en esta campana',
            vehiculo
          );
        }
      });
    });
  }

  filtrarVehiculoUbicacion() {}

  hayVehiculos(){
    return this.vehiculosMostrar.length>0;
  }

  ngOnInit() {
    //filtrar por pais y ciudad
    this.vehiculoService.getVehiculos().subscribe((data) => {
      data.forEach((vehiculo) => {
        switch (this.rolUsuario) {
          case 2: //chofer
            if (vehiculo.id_chofer === this.id) {
              const formularios = this.formService.formulariosObtenidos;
              const campanaactual = this.campanaService.getCampanaActual();
              const registro = formularios?.find(
                (form) =>
                  form.id_campana === campanaactual.id_campana &&
                  form.id_vehiculo === vehiculo.id_vehiculo
              );
              console.log(registro);
              registro ? console.log('') : this.vehiculosMostrar.push(vehiculo);

              //se muestra la info de aquellos vehiculos solo si yo soy chofer

            }
            break;
          case 5: //cliente
            if (vehiculo.id_cliente === this.id) {
              const formularios = this.formService.formulariosObtenidos;
              const campanaactual = this.campanaService.getCampanaActual();
              const registro = formularios?.find(
                (form) =>
                  form.id_campana === campanaactual.id_campana &&
                  form.id_vehiculo === vehiculo.id_vehiculo
              );

              if (registro) {
                //nada 
              }else{
                const cedula_cliente = this.clienteService.clienteActivo().cedula_cliente;
                //se muestra la info de aquellos vehiculos solo si yo soy chofer
                this.choferService
                  .getChoferbyId(vehiculo.id_chofer)
                  .subscribe((chofer) => {
                    if (String(chofer.cedula_chofer) === String(cedula_cliente)) {
                      this.vehiculosMostrar.push(vehiculo);
                    }
                  });
              }
            }
            break;
        }
      });
      
      this.loading = false;
    });
  }
}
