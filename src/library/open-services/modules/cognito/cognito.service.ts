import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { CognitoUser } from './models/user.model';
import { CognitoDatastore } from './cognito-datastore.service';
import { CognitoPool } from './models/pool.model';
import { CognitoCredential } from './models/cognito-credential.model';
import { CognitoApplication } from './models/applications.model';
import { map } from 'rxjs/operators';

export class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    preAuth: false,
    preAuthPath: '/preauth',
  };
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {


  apiHost: string;
  cognitoEndpoint: string;
  isAuthenticated: boolean;

  constructor(@Optional() config: EnvConfig,
              private http: HttpClient,
              private datastore: CognitoDatastore) {
    if (!config) {
      config = new EnvConfig();
    }

    this.apiHost = config.env.apiHost;
    this.isAuthenticated = false;
    if (!config.env.production) {
      this.cognitoEndpoint = 'http://localhost:4000' + config.env.preAuthPath;
    } else {
      this.cognitoEndpoint = config.env.preAuthPath;
    }

    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic ADHMJOIIMTOLFCFHFGMN:pEkCcZwX7aYD5_APSqNv3u4XfuSJoi8UhwTKsnzFzBry9HlRG9Zedw'
    });
  }

  authenticateAppWithPreAuth(referrer: string) {

    console.log(this.cognitoEndpoint);

    return this.http.get(this.cognitoEndpoint, {
      params: {
        url: referrer
      },
      observe: 'response'
    });
  }

  authenticateUser(bearer: string, user: string) {
    const payload = {
      data: {
        type: 'login',
        attributes: {
          primary_identifier: user,
        }
      }
    };
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/vnd.api+json',
          Authorization: bearer
        })
    };
    return this.http.post(this.apiHost + '/cognito/login', payload, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

  // authenticateUser(username: string, password: string) {

  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${ error.status }, ` +
  //       `body was: ${ error.error }`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }


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

  createUser(user: { username: string; api: boolean; console: boolean; }): Observable<CognitoUser> {
    const newUser = this.datastore.createRecord(
      CognitoUser,
      {
        ...user
      }
    );

    return newUser.save();
  }

  removeUser(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoUser,
      `${ id }`
    );
  }

  fetchCredentials(): Observable<JsonApiQueryData<CognitoCredential>> {
    return this.datastore.findAll(
      CognitoCredential,
      {
        page: { size: 10, number: 1 }
      }
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

  fetchPools(): Observable<JsonApiQueryData<CognitoPool>> {
    return this.datastore.findAll(
      CognitoPool,
      {
        page: { size: 10, number: 1 }
      }
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

  removePool(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoPool,
      `${ id }`
    );
  }

  fetchPool(id: number|string): Observable<CognitoPool> {
    return this.datastore.findRecord(
      CognitoPool,
      `${ id }`,
      {
        include: 'users'
      }
    );
  }

  fetchApplications(): Observable<JsonApiQueryData<CognitoApplication>> {
    return this.datastore.findAll(
      CognitoApplication,
      {
        page: { size: 10, number: 1 }
      }
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

  removeApplication(id: number|string): Observable<Response> {
    return this.datastore.deleteRecord(
      CognitoApplication,
      `${ id }`
    );
  }

  fetchApplication(id: number|string): Observable<CognitoApplication> {
    return this.datastore.findRecord(
      CognitoApplication,
      `${ id }`
    );
  }

}
