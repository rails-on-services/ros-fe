import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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

  fetchUsers() {
    return this.datastore.findAll(
      IamUser,
      {
        page: { size: 10, number: 1 }
      }
    );
  }

  addUser() {
  }

  removeUser(id: number | string) {
  }
}
