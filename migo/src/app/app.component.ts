import { Component, OnInit } from '@angular/core';
import { UsersService } from './providers/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

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
  ) {

  }

  ngOnInit() {
    let userExists = localStorage.getItem('userDetails');
    if(userExists){
      // Set HomePage as Root
      this.router.navigate(['/home']);

    }else{
      // Set Login Page as Root
    }
  }
}
