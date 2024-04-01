import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {
  @Input() solicitud!: FormularioAplicacion;
  @Input() mensaje = '';

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private ingresoService: IngresoConductorCampanaService,
    private formularioService: FormularioAplicacionService,
    private router: Router,
  ) {}

  ngOnInit() {}

  aceptar() {
    var ingreso = {
      fecha_registro: this.solicitud.fecha_envio.toString(),
      estado: 1,
      id_usuario: this.solicitud.id_usuario,
      id_campana: this.solicitud.id_campana,
      id_vehiculo: this.solicitud.id_vehiculo,
      id_ciudad: this.solicitud.id_ciudad,
      id_pais: this.solicitud.id_pais,
    };

    this.formularioService.cambiarEstadoFormulario(Number(this.solicitud.id_formulario), "activa").subscribe((response)=>{console.log(response)})
    this.ingresoService.crearIngreso(ingreso).subscribe((response)=>{console.log(response)});
    this.modalCtrl.dismiss();
  }

  cerrar() {
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateRoot('/solicitudes');
    this.router.navigate(['/solicitudes']);
    
  }
}
