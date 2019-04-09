import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { CognitoUser } from './models/user.model';
import { Datastore } from './cognito-datastore.service';

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
              private datastore: Datastore) {
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
      Authorization: 'Basic ADJJNEGQHXONNYIQOWLU:1chgEd6-lVBEMlb3sp8ewM0J46n3apBUb1cuM-f7SKsh1iEG37eomA'
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${ error.status }, ` +
        `body was: ${ error.error }`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  fetchUsers(): Observable<JsonApiQueryData<CognitoUser>> {
    return this.datastore.findAll(
      CognitoUser,
      {
        page: { size: 10, number: 1 }
      }
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
}
