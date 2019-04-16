import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';

import { IamUser } from './models/user.model';
import { Datastore } from './iam-datastore.service';
import { IamGroup } from './models/group.model';
import { IamPolicy } from './models/policy.model';

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

  removeUser(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamUser,
      `${ id }`
    );
  }

  fetchGroups(): Observable<JsonApiQueryData<IamGroup>> {
    return this.datastore.findAll(
      IamGroup,
      {
        page: { size: 10, number: 1 }
      }
    );
  }

  createGroup(group: { groupName: string, attachedPolicies: [], users: IamUser[]; }): Observable<IamGroup> {
    const newGroup = this.datastore.createRecord(
      IamGroup,
      {
        ...group
      }
    );

    return newGroup.save();
  }

  removeGroup(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamGroup,
      `${ id }`
    );
  }

  fetchPolicies(): Observable<JsonApiQueryData<IamPolicy>> {
    return this.datastore.findAll(
      IamPolicy,
      {
        page: { size: 10, number: 1 }
      }
    );
  }

  createPolicy(policy: { policyname: string; }): Observable<IamPolicy> {
    const newPolicy = this.datastore.createRecord(
      IamPolicy,
      {
        ...policy
      }
    );

    return newPolicy.save();
  }

  removePolicy(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamPolicy,
      `${ id }`
    );
  }
}
