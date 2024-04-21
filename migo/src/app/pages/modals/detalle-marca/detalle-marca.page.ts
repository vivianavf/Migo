import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa';
import { Pais } from 'src/app/interfaces/pais';

@Component({
  selector: 'app-detalle-marca',
  templateUrl: './detalle-marca.page.html',
  styleUrls: ['./detalle-marca.page.scss'],
})
export class DetalleMarcaPage implements OnInit {

  @Input() empresa!: Empresa;
  @Input() pais!: Pais;
  @Input() bannerURL!: string;

  constructor() { }

  ngOnInit() {
  }

}
