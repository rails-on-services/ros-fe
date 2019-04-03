import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {IamUser} from './models/user.model';

const IAM_USERS: IamUser[] = [
  new IamUser('1', 'rob123'),
  new IamUser('2', 'ryane123'),
  new IamUser('3', 'pie123')
];

const FETCH_LATENCY = 500;


@Injectable({
  providedIn: 'root'
})
export class IamService {

  constructor() {
  }

  fetchUser(id: number | string): Observable<IamUser> {
    const user$ = of(IAM_USERS.find(contact => contact.id === +id));
    return user$.pipe(delay(FETCH_LATENCY));
  }

  fetchUsers(): Observable<IamUser[]> {
    return of(IAM_USERS).pipe(delay(FETCH_LATENCY));
  }

  addUser(): Observable<any> {
    return of(IAM_USERS.push(new IamUser((IAM_USERS.length + 1).toString(), 'amit1234')));
  }

  removeUser(id: number | string): Observable<any> {
    const user$ = IAM_USERS.find(contact => contact.id === +id);
    return of(IAM_USERS.splice( IAM_USERS.indexOf(user$), 1 ));
  }
}
