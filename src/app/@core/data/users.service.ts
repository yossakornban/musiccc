import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let counter = 0;

@Injectable()
export class UserService {

  private _userName = '';
  private _role = '';

  private users = {
    user: { name: '', picture: 'assets/images/nick.png', role: '' }
  };

  private userArray: any[];

  constructor() {
    this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return Observable.of(this.userArray[counter]);
  }

  getUserName(): string{
    return this._userName;
  }

  setUserName(u: string): string{
    this.users.user.name = u;
    return this._userName = u;
  }

   getRole(): string{
    return this._role;
  }

  setRole(u: string): string{
    this.users.user.role = u;
    return this._role = u;
  }
}
