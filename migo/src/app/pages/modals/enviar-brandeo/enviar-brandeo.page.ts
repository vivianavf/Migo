import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-brandeo',
  templateUrl: './enviar-brandeo.page.html',
  styleUrls: ['./enviar-brandeo.page.scss'],
})
export class EnviarBrandeoPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      location.reload();
      this.router.navigate(['/home']);
    }, 3000);
  }

}
