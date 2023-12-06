import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/providers/empresa.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent  implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,
  ) { }

  verMas(empresa: Empresa){

  }

  ngOnInit() {
    this.empresaService.getEmpresas().subscribe((data=>{
      this.empresas = data;
    }))
    
  }

}
