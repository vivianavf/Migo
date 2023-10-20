import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo-password',
  templateUrl: './codigo-password.page.html',
  styleUrls: ['./codigo-password.page.scss'],
})
export class CodigoPasswordPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  siguiente(){
    this.router.navigate(['/reestablecer-password']);
  }

  ngOnInit() {
  }

}
