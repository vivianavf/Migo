import { Component, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';

@Component({
  selector: 'app-detalles-campana',
  templateUrl: './detalles-campana.page.html',
  styleUrls: ['./detalles-campana.page.scss'],
})
export class DetallesCampanaPage implements OnInit {

  campana!: Campana;

  constructor(
    private campanaService: CampanaService,
  ) { }

  ngOnInit() {
    console.log(this.campanaService.getCampanaActual())
    this.campana = this.campanaService.getCampanaActual()
  }

}
