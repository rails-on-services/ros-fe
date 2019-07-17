import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CognitoUser } from './models/user.model';
import { CognitoDatastore } from './cognito-datastore.service';
import { CognitoPool } from './models/pool.model';
import { CognitoCredential } from './models/cognito-credential.model';
import { CognitoApplication } from './models/applications.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private datastore: CognitoDatastore) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic ADHMJOIIMTOLFCFHFGMN:pEkCcZwX7aYD5_APSqNv3u4XfuSJoi8UhwTKsnzFzBry9HlRG9Zedw'
    });
  }

  fetchUsers(force?: boolean): Observable<CognitoUser[]> {
    if (!force) {
      const users = this.datastore.peekAll(CognitoUser);
      if (users && users.length > 0) {
        return of(users);
      }
    }

    return this.datastore.findAll(
      CognitoUser,
      {
        page: { size: 10, number: 1 },
        include: 'groups,credentials'
      }
    ).pipe(
      map(document => document.getModels())
    );
  }


  fetchUser(id: number | string, force?: boolean): Observable<CognitoUser> {
    if (!force) {
      const user = this.datastore.peekRecord(CognitoUser, `${id}`);
      if (user) {
        return of(user);
      }
    }

    return this.datastore.findRecord(CognitoUser, `${id}`);
  }

  createUser(user: { username: string; api: boolean; console: boolean; }): Observable<CognitoUser> {
    const newUser = this.datastore.createRecord(
      CognitoUser,
      {
        ...user
      }
    );

    return newUser.save();
  }

  removeUser(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoUser,
      `${id}`
    );
  }

  fetchCredentials(force?: boolean): Observable<CognitoCredential[]> {
    if (!force) {
      const credentials = this.datastore.peekAll(CognitoCredential);
      if (credentials && credentials.length > 0) {
        return of(credentials);
      }
    }

    return this.datastore.findAll(
      CognitoCredential,
      {
        page: { size: 10, number: 1 },
        // include: 'event'
      }
    ).pipe(
      map(document => document.getModels())
    );
  }


  createCredentialFor(user: CognitoPool): Observable<CognitoCredential> {
    const credential = this.datastore.createRecord(
      CognitoCredential,
      {
        ownerType: 'User',
        ownerId: user.id
      }
    );

    return credential.save();
  }

  fetchPools(userId?: number | string, force?: boolean): Observable<CognitoPool[]> {
    if (!force) {
      const pools = this.datastore.peekAll(CognitoPool);
      if (pools && pools.length > 0) {
        return of(pools);
      }
    }
    const params = {
      page: { size: 10, number: 1 },
      include: 'users'
    };
    if (userId) {
      params[`filter`] = { user_id: userId };
    }
    return this.datastore.findAll(
      CognitoPool,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  createPool(pool: { name: string, attachedPolicies: any[], users: CognitoPool[]; }): Observable<CognitoPool> {
    const newPool = this.datastore.createRecord(
      CognitoPool,
      {
        ...pool
      }
    );

    return newPool.save();
  }

  removePool(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoPool,
      `${id}`
    );
  }

  fetchPool(id: number | string, force?: boolean): Observable<CognitoPool> {
    if (!force) {
      const pool = this.datastore.peekRecord(CognitoPool, `${id}`);
      if (pool) {
        return of(pool);
      }
    }

    return this.datastore.findRecord(CognitoPool, `${id}`, { include: 'users' });
  }

  fetchApplications(userId?: number | string, force?: boolean): Observable<CognitoApplication[]> {
    if (!force) {
      const apps = this.datastore.peekAll(CognitoApplication);
      if (apps && apps.length > 0) {
        return of(apps);
      }
    }
    const params = {
      page: { size: 10, number: 1 }
    };
    if (userId) {
      params[`filter`] = { user_id: userId };
    }
    return this.datastore.findAll(
      CognitoApplication,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  createApplications(application: { name: string }): Observable<CognitoApplication> {
    const newApplication = this.datastore.createRecord(
      CognitoApplication,
      {
        ...application
      }
    );

    return newApplication.save();
  }

  removeApplication(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoApplication,
      `${id}`
    );
  }

  fetchApplication(id: number | string, force?: boolean): Observable<CognitoApplication> {
    if (!force) {
      const app = this.datastore.peekRecord(CognitoApplication, `${id}`);
      if (app) {
        return of(app);
      }
    }

    return this.datastore.findRecord(CognitoApplication, `${id}`, { include: 'users' });
  }

}
