import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { CampanaService } from 'src/app/providers/campana.service';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';
import { SolicitudesPageModule } from '../../solicitudes/solicitudes.module';
import { Campana } from 'src/app/interfaces/campana';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {
  @Input() solicitud!: FormularioAplicacion;
  @Input() mensaje = 'Desea confirmar su plaza para la campaña';

  campana!: Campana;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private ingresoService: IngresoConductorCampanaService,
    private formularioService: FormularioAplicacionService,
    private campanaService: CampanaService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.campanaService.getCampanabyId(this.solicitud.id_campana).subscribe((data)=>{
      this.campana = data;
    })
  }

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
    this.router.navigate(['/home']);
    // location.reload();
  }

  cerrar() {
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateRoot('/solicitudes');
    this.router.navigate(['/solicitudes']);
    
  }
}
