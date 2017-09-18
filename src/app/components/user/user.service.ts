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
