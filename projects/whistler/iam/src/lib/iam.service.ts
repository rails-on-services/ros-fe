import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JsonApiModel, JsonApiQueryData } from 'angular2-jsonapi';

import { IamUser } from './models/user.model';
import { Datastore } from './iam-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class IamService {

  constructor(private datastore: Datastore) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic ADJJNEGQHXONNYIQOWLU:1chgEd6-lVBEMlb3sp8ewM0J46n3apBUb1cuM-f7SKsh1iEG37eomA'
    });
  }

  fetchUsers(): Observable<JsonApiQueryData<IamUser>> {
    return this.datastore.findAll(
      IamUser,
      {
        page: { size: 10, number: 1 }
      }
    );
  }

  createUser(user: { username: string; api: boolean; console: boolean; }): Observable<IamUser> {
    const newUser = this.datastore.createRecord(
      IamUser,
      {
        ...user
      }
    );

    return newUser.save();
  }

  removeUser(id: number | string) {
  }
}
