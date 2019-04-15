import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  private users = {
    'data': [{
      'id': '1',
      'type': 'users',
      'links': { 'self': 'http://13.229.71.66:3000/users/1' },
      'attributes': {
        'urn': 'urn:perx:iam::222222222:user/Admin_2',
        'username': 'Admin_2',
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:user/Admin_2', 'scope': '*' },
        'attached_policies': { 'AdministratorAccess': 1 },
        'attached_actions': {}
      }
    }, {
      'id': '23',
      'type': 'users',
      'links': { 'self': 'http://13.229.71.66:3000/users/23' },
      'attributes': {
        'urn': 'urn:perx:iam::222222222:user/dink',
        'username': 'dink',
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:user/dink', 'scope': '*' },
        'attached_policies': {},
        'attached_actions': {}
      }
    }, {
      'id': '26',
      'type': 'users',
      'links': { 'self': 'http://13.229.71.66:3000/users/26' },
      'attributes': {
        'urn': 'urn:perx:iam::222222222:user/prianka',
        'username': 'prianka',
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:user/prianka', 'scope': '*' },
        'attached_policies': {},
        'attached_actions': {}
      }
    }]
  };

  private groups = {
    'data': [{
      'id': '1',
      'type': 'groups',
      'links': { 'self': 'http://13.229.71.66:3000/groups/1' },
      'attributes': {
        'groupname': 'group 1',
        'urn': 'urn:perx:iam::222222222:group/1',
        'users': ['Admin_2',],
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:group/1', 'scope': '*' },
        'attached_policies': { 'AdministratorAccess': 1 },
        'attached_actions': {}
      }
    }, {
      'id': '2',
      'type': 'groups',
      'links': { 'self': 'http://13.229.71.66:3000/groups/2' },
      'attributes': {
        'groupname': 'group 2',
        'urn': 'urn:perx:iam::222222222:group/2',
        'users': ['dink',],
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:group/2', 'scope': '*' },
        'attached_policies': {},
        'attached_actions': {}
      }
    }, {
      'id': '3',
      'type': 'groups',
      'links': { 'self': 'http://13.229.71.66:3000/groups/3' },
      'attributes': {
        'groupname': 'group 3',
        'urn': 'urn:perx:iam::222222222:group/3',
        'users': ['prianka', 'dink'],
        'jwt_payload': { 'iss': 'http://iam:3000', 'sub': 'urn:perx:iam::222222222:group/3', 'scope': '*' },
        'attached_policies': {},
        'attached_actions': {}
      }
    }]
  };

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    // const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      // if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
      //   // find if any user matches login credentials
      //   const filteredUsers = users.filter(user => {
      //     return user.username === request.body.username && user.password === request.body.password;
      //   });
      //
      //   if (filteredUsers.length) {
      //     // if login details are valid return 200 OK with user details and fake jwt token
      //     const user = filteredUsers[0];
      //     const body = {
      //       id: user.id,
      //       username: user.username,
      //       firstName: user.firstName,
      //       lastName: user.lastName,
      //       token: 'fake-jwt-token'
      //     };
      //
      //     return of(new HttpResponse({ status: 200, body: body }));
      //   } else {
      //     // else return 400 bad request
      //     return throwError({ error: { message: 'Username or password is incorrect' } });
      //   }
      // }

      // get users
      if (request.url.includes('iam/users') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Basic ADJJNEGQHXONNYIQOWLU:1chgEd6-lVBEMlb3sp8ewM0J46n3apBUb1cuM-f7SKsh1iEG37eomA') {
          return of(new HttpResponse({ status: 200, body: this.users }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ error: { message: 'Unauthorised lol' } });
        }
      }

      // get groups
      if (request.url.includes('iam/groups') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Basic ADJJNEGQHXONNYIQOWLU:1chgEd6-lVBEMlb3sp8ewM0J46n3apBUb1cuM-f7SKsh1iEG37eomA') {
          return of(new HttpResponse({ status: 200, body: this.groups }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ error: { message: 'Unauthorised lol' } });
        }
      }

      // get user by id
      // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
      //   // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
      //   if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
      //     // find user by id in users array
      //     const urlParts = request.url.split('/');
      //     const id = parseInt(urlParts[urlParts.length - 1]);
      //     const matchedUsers = users.filter(user => {
      //       return user.id === id;
      //     });
      //     const user = matchedUsers.length ? matchedUsers[0] : null;
      //
      //     return of(new HttpResponse({ status: 200, body: user }));
      //   } else {
      //     // return 401 not authorised if token is null or invalid
      //     return throwError({ error: { message: 'Unauthorised' } });
      //   }
      // }

      // register user
      // if (request.url.endsWith('/users/register') && request.method === 'POST') {
      //   // get new user object from post body
      //   const newUser = request.body;
      //
      //   // validation
      //   const duplicateUser = users.filter(user => {
      //     return user.username === newUser.username;
      //   }).length;
      //   if (duplicateUser) {
      //     return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
      //   }
      //
      //   // save new user
      //   newUser.id = users.length + 1;
      //   users.push(newUser);
      //   localStorage.setItem('users', JSON.stringify(users));
      //
      //   // respond 200 OK
      //   return of(new HttpResponse({ status: 200 }));
      // }

      // delete user
      // if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
      //   // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
      //   if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
      //     // find user by id in users array
      //     const urlParts = request.url.split('/');
      //     const id = parseInt(urlParts[urlParts.length - 1]);
      //     for (const i = 0; i < users.length; i++) {
      //       const user = users[i];
      //       if (user.id === id) {
      //         // delete user
      //         users.splice(i, 1);
      //         localStorage.setItem('users', JSON.stringify(users));
      //         break;
      //       }
      //     }
      //
      //     // respond 200 OK
      //     return of(new HttpResponse({ status: 200 }));
      //   } else {
      //     // return 401 not authorised if token is null or invalid
      //     return throwError({ error: { message: 'Unauthorised' } });
      //   }
      // }

      // pass through any requests not handled above
      return next.handle(request);
    }))

    // call materialize and dematerialize to ensure delay even if an error
    // is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export const FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
