import { Component, OnInit } from '@angular/core';
import { UsersService } from './providers/users.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public users: User[] = [];

  constructor(
    private userService: UsersService,
  ) {

  }

  ngOnInit() {
    // this.userService.getUsers().subscribe((data) => {
    //   this.users = data
    //   console.log(this.users)
    // });

  }
}
