import { Component, OnInit } from '@angular/core';
import { UsersService } from './providers/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClienteService } from './providers/cliente.service';
import { CampanaService } from './providers/campana.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public users: User[] = [];

  constructor(
    private userService: UsersService,
    private clientService: ClienteService,
    private campanaService: CampanaService,
    private router: Router,
    private navCtrl: NavController,
  ) {

  }

  ngOnInit() {

    this.userService.getUsers().subscribe((data)=>{})
    this.clientService.getClients().subscribe((data)=>{})
    this.campanaService.getCampanas().subscribe((data)=>{})

    let userExists = localStorage.getItem('email_usuario');
    if(userExists){
      // Set HomePage as Root
      // this.router.navigate(['/home']);
      this.navCtrl.navigateRoot('/home');

      //aqui se renderiza el tabs
      
    }else{
      // Set Login Page as Root
      // this.router.navigate(['/login']);
      this.navCtrl.navigateRoot('/login')
      console.log("no hay nada")
    }
  }
}
