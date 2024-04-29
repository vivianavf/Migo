import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { Sector } from 'src/app/interfaces/sector';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { TabsService } from 'src/app/providers/tabs.service';

@Component({
  selector: 'app-conducir-modal',
  templateUrl: './conducir-modal.page.html',
  styleUrls: ['./conducir-modal.page.scss'],
})
export class ConducirModalPage implements OnInit {

  @Input() campana!: Campana;
  @Input() vehiculo!: Vehiculo;
  @Input() sector!: Sector;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private tabService: TabsService,
  ) { }

  ngOnInit() {

  }

  cerrarVentana(){
    this.modalController.dismiss();
  }

  crearRecorrido(){
    this.router.navigate(['/nuevo-recorrido'])
    localStorage.setItem('campana-recorrido', JSON.stringify(this.campana));
    localStorage.setItem('vehiculo-recorrido', JSON.stringify(this.vehiculo));
    localStorage.setItem('sector-recorrido',JSON.stringify(this.sector));
    localStorage.setItem('fecha-inicio-recorrido',JSON.stringify(new Date()));
    this.modalController.dismiss();
    localStorage.setItem('recorrido','true')
  }

}
