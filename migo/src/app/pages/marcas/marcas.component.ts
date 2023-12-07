import { Component, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { Empresa } from 'src/app/interfaces/empresa';
import { CampanaService } from 'src/app/providers/campana.service';
import { EmpresaService } from 'src/app/providers/empresa.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent  implements OnInit {

  empresas: Empresa[] = [];
  campanas: Campana[] = [];

  constructor(
    private empresaService: EmpresaService,
    private campanaService: CampanaService,
  ) { }

  verMas(empresa: Empresa){

    //Mostrar info de la empresa

  }

  contarCampanasActivas(idEmpresa: any){
    const campanasEmpresa = this.campanas.filter(
      (campana) => campana.id_empresa === Number(idEmpresa)
    );

    return campanasEmpresa.length;
  }

  ngOnInit() {
    this.empresaService.getEmpresas().subscribe((data=>{
      this.empresas = data;
      })
    )

    this.campanaService.getCampanas().subscribe((data)=>{
      this.campanas = data;
    })

  }

}
