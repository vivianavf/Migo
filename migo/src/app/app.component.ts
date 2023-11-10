import { Component, OnInit } from '@angular/core';
import { UsersService } from './providers/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public users: User[] = [];

  constructor(
    private userService: UsersService,
    private router: Router,
    private navCtrl: NavController,
  ) {

  }

  ngOnInit() {
    let userExists = localStorage.getItem('email_usuario');
    if(userExists){
      // Set HomePage as Root
      // this.router.navigate(['/home']);
      this.navCtrl.navigateRoot('/home');
    }else{
      // Set Login Page as Root
      // this.router.navigate(['/login']);
      this.navCtrl.navigateRoot('/login')
      console.log("no hay nada")
    }
  }
}
