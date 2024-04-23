import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { VehiculosPageModule } from '../../vehiculos/vehiculos.module';
import { VehiculosPage } from '../../vehiculos/vehiculos.page';

@Component({
  standalone: true,
  selector: 'app-eliminar-vehiculo',
  templateUrl: './eliminar-vehiculo.component.html',
  styleUrls: ['./eliminar-vehiculo.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ],
})
export class EliminarVehiculoComponent implements OnInit {
  @Input() vehiculo!: Vehiculo;

  deleteVehiculo: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    private modalCtrl: ModalController,
    private router: Router,
    private VehiculosPage: VehiculosPage,
  ) {}

  ngOnInit() {
    this.deleteVehiculo = false;
  }

  eliminarVehiculo() {
    this.deleteVehiculo = true;
    this.vehiculoService.deleteVehiculo(this.vehiculo.id_vehiculo!).subscribe((response)=>{
      setTimeout(this.redireccion, 2000);
  })
  }

  redireccion(){
    // this.modalCtrl.dismiss();
    location.reload();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
