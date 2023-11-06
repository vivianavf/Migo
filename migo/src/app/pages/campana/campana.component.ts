import { Component, Input, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.scss'],
})
export class CampanaComponent  implements OnInit {

  campanas: Campana[] = [];

  constructor(
    private campanaService: CampanaService,
  ) { }

  ngOnInit() {
    this.campanaService.getCampanas().subscribe((data)=>{
      console.log(data)
      this.campanas = data;
    })
  }

}
