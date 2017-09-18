# The User component
This will be a component that lists some users

## Create the User component

Start with creating a new folder for our components
```
cd src/app
mkdir components
cd components
```

Then generate stub code for the list component
```
ng generate component user
```

## Introducing the Angular router

The [Angular Router](https://angular.io/guide/router) enables navigation from one view to the next as users perform application tasks.

Our goal here is make it possible to navigate to the newly added `user` component.

### Import the router package
Add the following to 'app.module.ts'
```
import { RouterModule, Routes } from '@angular/router';
```

### Configure the router
Add the following to 'app.module.ts' to the `@NgModule` imports statement.

```
RouterModule.forRoot(
      [
        {path: '', component: HomeComponent},
        {path: 'users', component: UserComponent},
      ]
    )
```

Update `app.component.html` to use the router-outlet 

```
<router-outlet></router-outlet>
```

Verify that navigation to the list component works by navigating to `localhost:4200/list` in the browser

### Add a link in the home component to the list component
Add a router link in the `home.component.html` file

```
<h1>
  {{title}}
</h1>
<p>
  <a routerLink="/users" routerLinkActive="active">Users</a>
</p>
```

## Displaying a list of users
We will use [JSONPlaceholder](https://jsonplaceholder.typicode.com) to fetch some 
users which we will display.

The user information returned from the above REST endpoint contains a lot of data but we will only use some of the properties.
To model the `user` data we create a class holding the properties of a user.

In `src/app/components/user` create a new file `user.ts` with the following content.

```
export class User {
  id: number;
  name: string;
  email: string;
}
```

Next we create a service for retreiving users over HTTP. 
Here we are using `BehaviorSubject`, which is a type of `Observable`. Read more on this [here](https://www.illucit.com/blog/2016/05/reactive-streams-angular2/) and [here](https://coryrylan.com/blog/angular-observable-data-services) 

```
import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http, Response } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  httpService: Http;
  url = 'https://jsonplaceholder.typicode.com/users';
  headers = new Headers({'Accept': 'application/json'});
  userData: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: Http) {
    this.httpService = http;
  }

  getUsers(): BehaviorSubject<User[]> {
    this.httpService.get(this.url, {headers: this.headers})
      .subscribe((res: Response) => {
        this.userData.next(res.json() as User[]);
      }, error => console.log('Error: ', error));
    return this.userData;
  }
}
```

Add the UserService as provider in `app.module.ts`

```
...
providers: [UserService],
...
```

Then finally update `user.component.html` to actually render a table of users.
Here we use the [*ngFor](https://angular.io/guide/displaying-data) angular directive and also the [async](https://angular.io/api/common/AsyncPipe) pipe. 

```
<h1>Users</h1>

<table>
  <thead>
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Email</th>
  </tr>
  </thead>

  <tbody>
  <tr *ngFor="let user of users | async">
    <td>{{user.id}}</td>
    <td>{{user.name}}</td>
    <td>{{user.email}}</td>
  </tr>
  </tbody>
</table>

```

### Two-way binding example
We want to filter the user list and only show the user matching a certain id.

First add input field for the id. In `user.component.html` add
```
<input [(ngModel)]="filterId">
```

and 

```
...
<div *ngIf="match(user.id)">
  <td>{{user.id}}</td>
  <td>{{user.name}}</td>
  <td>{{user.email}}</td>
</div>
...
```

Read more about NgModel [here](https://angular.io/api/forms/NgModel).

In `user.component.ts` add filter id property and method to check if a given id matches the filter id.

```
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

```


