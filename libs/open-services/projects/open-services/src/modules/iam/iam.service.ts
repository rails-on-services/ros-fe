import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IamUser } from './models/user.model';
import { IamDatastore } from './iam-datastore.service';
import { IamGroup } from './models/group.model';
import { IamPolicy } from './models/policy.model';
import { IamCredential } from './models/iam-credential.model';

@Injectable({
  providedIn: 'root'
})
export class IamService {

  constructor(private datastore: IamDatastore) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic ADHMJOIIMTOLFCFHFGMN:pEkCcZwX7aYD5_APSqNv3u4XfuSJoi8UhwTKsnzFzBry9HlRG9Zedw'

    });
  }

  public fetchUsers(groupId?: number | string): Observable<IamUser[]> {

    // if (!force) {
    //   const users = this.datastore.peekAll(IamUser);
    //   if (users && users.length > 0) {
    //     return of(users);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 },
      include: 'groups,credentials'
    };
    if (groupId) {
      params[`filter`] = { group_id: groupId };
    }
    return this.datastore.findAll(
      IamUser,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchUser(id: number | string): Observable<IamUser> {
    // if (!force) {
    //   const user = this.datastore.peekRecord(IamUser, `${id}`);
    //   if (user) {
    //     return of(user);
    //   }
    // }

    return this.datastore.findRecord(IamUser, `${id}`, { include: 'groups' });
  }

  public createUser(user: { username: string; api: boolean; console: boolean; }): Observable<IamUser> {
    const newUser = this.datastore.createRecord(
      IamUser,
      {
        ...user
      }
    );

    return newUser.save();
  }

  public removeUser(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamUser,
      `${id}`
    );
  }

  public fetchCredentials(): Observable<IamCredential[]> {
    // if (!force) {
    //   const credentials = this.datastore.peekAll(IamCredential);
    //   if (credentials && credentials.length > 0) {
    //     return of(credentials);
    //   }
    // }

    return this.datastore.findAll(
      IamCredential,
      {
        page: { size: 10, number: 1 },
        // include: 'event'
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public createCredentialFor(user: IamUser): Observable<IamCredential> {
    const credential = this.datastore.createRecord(
      IamCredential,
      {
        ownerType: 'User',
        ownerId: user.id
      }
    );

    return credential.save();
  }

  public fetchGroups(userId?: number | string): Observable<IamGroup[]> {
    // if (!force) {
    //   const groups = this.datastore.peekAll(IamGroup);
    //   if (groups && groups.length > 0) {
    //     return of(groups);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 },
      include: 'users'
    };
    if (userId) {
      params[`filter`] = { user_id: userId };
    }
    return this.datastore.findAll(
      IamGroup,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchGroup(id: number | string): Observable<IamGroup> {
    // if (!force) {
    //   const group = this.datastore.peekRecord(IamGroup, `${id}`);
    //   if (group) {
    //     return of(group);
    //   }
    // }

    return this.datastore.findRecord(IamGroup, `${id}`, { include: 'users' });
  }

  public createGroup(group: { name: string, attachedPolicies: any[], users: IamUser[]; }): Observable<IamGroup> {
    const newGroup = this.datastore.createRecord(
      IamGroup,
      {
        ...group
      }
    );

    return newGroup.save();
  }

  public removeGroup(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamGroup,
      `${id}`
    );
  }

  // TODO: this need to check with Rob with relationship

  public fetchPolicies(userId?: number | string): Observable<IamPolicy[]> {
    // if (!force) {
    //   const policies = this.datastore.peekAll(IamPolicy);
    //   if (policies && policies.length > 0) {
    //     return of(policies);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 }
    };
    if (userId) {
      params[`filter`] = { user_id: userId };
    }
    return this.datastore.findAll(
      IamPolicy,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchPolicy(id: number | string): Observable<IamPolicy> {
    // if (!force) {
    //   const policy = this.datastore.peekRecord(IamPolicy, `${id}`);
    //   if (policy) {
    //     return of(policy);
    //   }
    // }

    return this.datastore.findRecord(IamPolicy, `${id}`);
  }

  public createPolicy(policy: { policyname: string; }): Observable<IamPolicy> {
    const newPolicy = this.datastore.createRecord(
      IamPolicy,
      {
        ...policy
      }
    );

    return newPolicy.save();
  }

  public removePolicy(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      IamPolicy,
      `${id}`
    );
  }
}
