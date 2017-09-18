import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {UserService} from './user.service';

@Component({
  selector: 'app-list',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userService: UserService;
  users: Observable<User[]>;
  filterId: Number;

  constructor(private service: UserService) {
    this.userService = service;
    this.filterId = null;
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  match(id: number): boolean {
    if (!this.filterId) {
      return true;
    } else {
      return (id == this.filterId);
    }
  }


}
