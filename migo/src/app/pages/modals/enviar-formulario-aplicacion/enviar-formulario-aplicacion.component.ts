import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-enviar-formulario-aplicacion',
  templateUrl: './enviar-formulario-aplicacion.component.html',
  styleUrls: ['./enviar-formulario-aplicacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ],
})
export class EnviarFormularioAplicacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
