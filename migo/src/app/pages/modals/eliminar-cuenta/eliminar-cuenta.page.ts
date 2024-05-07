import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { ChoferService } from 'src/app/providers/chofer.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';
import { UsersService } from 'src/app/providers/users.service';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { VerificacionService } from 'src/app/providers/verificacion.service';
import { Timer } from 'timer-node';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.page.html',
  styleUrls: ['./eliminar-cuenta.page.scss'],
})
export class EliminarCuentaPage implements OnInit {

  eliminarFlag: boolean = false;
  eliminandoDatos: boolean = false;

  // timer
  botonEliminarCuenta: boolean = false;
  display: any;

  constructor(
    private router: Router,
    private ModalCtrl: ModalController,
    private usuarioService: UsersService,
    private empresaService: EmpresaService,
    private empresaImagesService: EmpresaImagesService,
    private vehiculosService: VehiculoService,
    private recorridosService: RecorridoRealizadoService,
    private ingresoService: IngresoConductorCampanaService,
    private formService: FormularioAplicacionService,
    private choferService: ChoferService,
    private verificacionesService: VerificacionService,
    private clienteService: ClienteService,

    // private movimientoCapital: MovimientoCapitalService,
  ) { }

  ngOnInit() {
    this.eliminarFlag = false;
  }

  cerrar(){
    this.ModalCtrl.dismiss();
  }

  aceptar(){
    this.countdownTimer(5);
    this.eliminarFlag = true;
  }

  async eliminarCuentaDef(){
    this.eliminandoDatos = true;
    this.eliminarDatosUsuario();    
  }

  async eliminarDatosUsuario(){
    const usuarioActual = this.usuarioService.usuarioActivo();
    const idUsuario = usuarioActual.id_usuario;


    //fin de las eliminaciones
    this.ModalCtrl.dismiss();
    this.resetLocalStorage();
    this.router.navigate(['/login']);
    
  }

  resetLocalStorage(){
    localStorage.clear();
  }

  countdownTimer(seconds: number) {
    const timer = setInterval(() => {
      this.display = `${seconds}`;
      seconds--;
      if (seconds == 0) {
        this.botonEliminarCuenta = true;
        clearInterval(timer);
      }
    }, 1000);
  }

}
