import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';

@Component({
  selector: 'app-anular-registro',
  templateUrl: './anular-registro.page.html',
  styleUrls: ['./anular-registro.page.scss'],
})
export class AnularRegistroPage implements OnInit {

  @Input() campana!: Campana;
  @Input() vehiculo!: Vehiculo;
  @Input() solicitud!: FormularioAplicacion;

  constructor(
    private router: Router,
    private formService: FormularioAplicacionService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  anularRegistro(){
    this.formService.cambiarEstadoFormulario(this.solicitud.id_formulario!, 'anulada').subscribe((response)=>{
      console.log(response)
      location.reload();
    });
    // location.reload();
    this.router.navigate(['/solicitudes']);
    this.modalController.dismiss();
    // location
  }

  cancelar(){
    this.modalController.dismiss();
  }

}
