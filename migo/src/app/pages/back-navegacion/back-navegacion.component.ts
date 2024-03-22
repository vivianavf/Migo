import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  standalone: true,
  selector: 'app-back-navegacion',
  templateUrl: './back-navegacion.component.html',
  styleUrls: ['./back-navegacion.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,],
})
export class BackNavegacionComponent  implements OnInit {

  mostrarBotonFiltro = false;
  mostrarTitulo = true;
  imgBanner: number = 1;
  textoToolbar = ""
  showAds!: boolean;

  constructor(
    private toolbarService: ToolbarService,
    
  ) { }

  ngOnInit() {
    var autoSaveInterval = setInterval(() => {
      this.imgBanner = this.generarNumeroBanner();
    }, 5000);

    this.toolbarService.showAdsimg = this.showAds;

    if(this.toolbarService.getTexto() == "HOME"){
      this.mostrarTitulo = false;
      this.mostrarBotonFiltro = true;
      this.textoToolbar = this.toolbarService.getTexto();
    }else{
      this.mostrarTitulo = true;
      this.mostrarBotonFiltro = false;
      this.textoToolbar = this.toolbarService.getTexto();
    }
  }

  cerrarModal() {
    // this.modalController.dismiss();
  }

  generarNumeroBanner() {
    const numeroAleatorio = Math.random();
    // Multiplica por 10 para obtener un número entre 0 (inclusive) y 10 (exclusivo)
    const numeroEntre0Y10 = numeroAleatorio * 15;

    // Añade 1 para obtener un número entre 1 (inclusive) y 11 (exclusivo)
    const numeroEntre1Y11 = numeroEntre0Y10 + 1;

    // Utiliza Math.floor para redondear hacia abajo y obtener un número entero entre 1 y 10
    const numeroFinal = Math.floor(numeroEntre1Y11);
    return numeroFinal;
  }

}
