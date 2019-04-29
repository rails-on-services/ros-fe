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
import { FeatureFlagsService } from '../src/shared/services/feature-flags/feature-flags.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}

@Injectable()
export class MockRequestInterceptor implements HttpInterceptor {

  users: any = {
    data: [{
      id: '1',
      type: 'users',
      links: { self: 'https://api.ros.rails-on-services.org/users/1' },
      attributes: {
        urn: 'urn:perx:iam::222222222:user/Admin_2',
        username: 'Admin_2',
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:user/Admin_2', scope: '*' },
        attached_policies: { AdministratorAccess: 1 },
        attached_actions: {}
      }
    }, {
      id: '23',
      type: 'users',
      links: { self: 'https://api.ros.rails-on-services.org/users/23' },
      attributes: {
        urn: 'urn:perx:iam::222222222:user/dink',
        username: 'dink',
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:user/dink', scope: '*' },
        attached_policies: {},
        attached_actions: {}
      }
    }, {
      id: '26',
      type: 'users',
      links: { self: 'https://api.ros.rails-on-services.org/users/26' },
      attributes: {
        urn: 'urn:perx:iam::222222222:user/prianka',
        username: 'prianka',
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:user/prianka', scope: '*' },
        attached_policies: {},
        attached_actions: {}
      }
    }]
  };

  private groups: any = {
    data: [{
      id: '1',
      type: 'groups',
      links: { self: 'https://api.ros.rails-on-services.org/groups/1' },
      attributes: {
        name: 'group 1',
        urn: 'urn:perx:iam::222222222:group/1',
        users: ['Admin_2', ],
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:group/1', scope: '*' },
        attached_policies: { AdministratorAccess: 1 },
        attached_actions: {}
      }
    }, {
      id: '2',
      type: 'groups',
      links: { self: 'https://api.ros.rails-on-services.org/groups/2' },
      attributes: {
        name: 'group 2',
        urn: 'urn:perx:iam::222222222:group/2',
        users: ['dink', ],
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:group/2', scope: '*' },
        attached_policies: {},
        attached_actions: {}
      }
    }, {
      id: '3',
      type: 'groups',
      links: { self: 'https://api.ros.rails-on-services.org/groups/3' },
      attributes: {
        name: 'group 3',
        urn: 'urn:perx:iam::222222222:group/3',
        users: ['prianka', 'dink'],
        jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:group/3', scope: '*' },
        attached_policies: {},
        attached_actions: {}
      }
    }]
  };

  private policies: any = {
    data: [
      {
        id: '1',
        type: 'policy',
        links: { self: 'https://api.ros.rails-on-services.org/policies/1' },
        attributes: {
          urn: 'urn:perx:iam::222222222:policy/AdministratorAccess',
          policyname: 'AdministratorAccess',
          type: 'Job function',
          attachments: 1,
          used_as: 'admin',
          creation_time: '2015-02-07 02:12 UTC+0800',
          edited_time: '2015-02-07 02:12 UTC+0800',
          jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:user/prianka', scope: '*' },
          description: 'Admin',
          attached_actions: {}
        }
      },
      {
        id: '2',
        type: 'policy',
        links: { self: 'https://api.ros.rails-on-services.org/policies/1' },
        attributes: {
          urn: 'urn:perx:iam::222222222:policy/AdministratorAccess',
          policyname: 'AdministratorAccess',
          type: 'Job function',
          attachments: 0,
          used_as: 'admin',
          creation_time: '2015-02-07 02:12 UTC+0800',
          edited_time: '2015-02-07 02:12 UTC+0800',
          jwt_payload: { iss: 'http://iam:3000', sub: 'urn:perx:iam::222222222:user/prianka', scope: '*' },
          description: 'Admin',
          attached_actions: {}
        }
      }
    ]
  };

  private campaigns: any = {
    data: [
      {
        id: '1',
        type: 'reward',
        links: { self: 'https://api.ros.rails-on-services.org/campaigns/1' },
        attributes: {
          parent_id: null,
          name: 'Cafe 1',
          merchant_name: 'Starbucks',
          status: 'Active',
          start_date: '2019-04-26T08:32:54.689Z',
          end_date: '2019-06-26T08:32:54.689Z',
          reward_balance_current: 500,
          reward_balance_max: 1000
        }
      },
      {
        id: '2',
        type: 'reward',
        links: { self: 'https://api.ros.rails-on-services.org/campaigns/2' },
        attributes: {
          parent_id: null,
          name: 'Cafe 2',
          merchant_name: 'Starbucks',
          status: 'Active',
          start_date: '2019-04-26T08:32:54.689Z',
          end_date: '2019-06-26T08:32:54.689Z',
          reward_balance_current: 500,
          reward_balance_max: 1000
        }
      },
      {
        id: '3',
        type: 'reward',
        links: { self: 'https://api.ros.rails-on-services.org/campaigns/3' },
        attributes: {
          parent_id: '1',
          name: 'Cafe 1 - Sub #3',
          merchant_name: 'Starbucks',
          status: 'Active',
          start_date: '2019-04-26T08:32:54.689Z',
          end_date: '2019-06-26T08:32:54.689Z',
          reward_balance_current: 500,
          reward_balance_max: 1000
        }
      },
      {
        id: '4',
        type: 'reward',
        links: { self: 'https://api.ros.rails-on-services.org/campaigns/4' },
        attributes: {
          parent_id: '1',
          name: 'Cafe 1 - Sub #4',
          merchant_name: 'Starbucks',
          status: 'Active',
          start_date: '2019-04-26T08:32:54.689Z',
          end_date: '2019-06-26T08:32:54.689Z',
          reward_balance_current: 500,
          reward_balance_max: 1000
        }
      }
    ]
  };

  constructor(private featureFlagService: FeatureFlagsService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    // const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // check for fake auth token in header and return data if valid, this security is implemented server side in a real application
      if (!/^Basic\s.+$/.test(request.headers.get('Authorization'))) {
        return throwError({ error: { message: 'Unauthorised lol' } });
      }

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
      if (this.featureFlagService.mockUsersDb) {
        if (request.url.includes('iam/users') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.users }));
        }

        if (request.url.includes('iam/users') && request.method === 'POST') {
          // get new user object from post body
          const newUser = request.body;

          // validation
          const duplicateUser = this.users.data.filter(user => {
            return user.attributes.username === newUser.data.attributes.username;
          }).length;
          if (duplicateUser) {
            return throwError({ error: { message: 'User name "' + newUser.username + '" is already taken' } });
          }

          // save new user
          newUser.data.id = this.users.data.length + 1;
          this.users.data.push(newUser.data);
          // localStorage.setItem('users', JSON.stringify(this.users));

          return of(new HttpResponse({ status: 201, body: newUser }));
        }

        // delete user
        if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          for (let i = 0; i < this.users.data.length; i++) {
            const user = this.users.data[i];
            if (parseInt(user.id, 10) === id) {
              // delete user
              this.users.data.splice(i, 1);
              // localStorage.setItem('users', JSON.stringify(this.users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({ status: 204 }));
        }
      }
      if (this.featureFlagService.mockGroupsDb) {
        // get groups
        if (request.url.includes('iam/groups') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.groups }));
        }

        // create group
        if (request.url.includes('iam/groups') && request.method === 'POST') {
          // get new group object from post body
          const newGroup = request.body;

          // validation
          const duplicateGroup = this.groups.data.filter(group => {
            return group.attributes.name === newGroup.data.attributes.name;
          }).length;
          if (duplicateGroup) {
            return throwError({ error: { message: 'Group name "' + newGroup.name + '" is already taken' } });
          }

          // save new group
          newGroup.data.id = this.groups.data.length + 1;
          this.groups.data.push(newGroup.data);
          // localStorage.setItem('groups', JSON.stringify(this.groups));

          return of(new HttpResponse({ status: 201, body: newGroup }));
        }

        // delete group
        if (request.url.match(/\/groups\/\d+$/) && request.method === 'DELETE') {
          // find user by id in groups array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          for (let i = 0; i < this.groups.data.length; i++) {
            const user = this.groups.data[i];
            if (parseInt(user.id, 10) === id) {
              // delete groups
              this.groups.data.splice(i, 1);
              // localStorage.setItem('users', JSON.stringify(this.users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({ status: 204 }));
        }

        // update group
        if (request.url.match(/\/groups\/\d+$/) && request.method === 'PATCH') {
          // get new group object from post body
          const newGroup = request.body;
          return of(new HttpResponse({ status: 201, body: newGroup }));
        }

        // get group by id
        if (request.url.match(/\/groups\/\d+$/) && request.method === 'GET') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          // find group by id in groups array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          const matchedGroups = this.groups.data.filter(match => {
            return match.id === id;
          });
          const group = matchedGroups.length ? matchedGroups[0] : null;
          return of(new HttpResponse({ status: 200, body: group }));
        }
      }
      // get user by id
      // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
      //   // find user by id in users array
      //   const urlParts = request.url.split('/');
      //   const id = parseInt(urlParts[urlParts.length - 1]);
      //   const matchedUsers = users.filter(user => {
      //     return user.id === id;
      //   });
      //   const user = matchedUsers.length ? matchedUsers[0] : null;
      //
      //   return of(new HttpResponse({ status: 200, body: user }));
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


      if (this.featureFlagService.mockPoliciesDb) {
        if (request.url.includes('iam/policies') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.policies }));
        }

        if (request.url.includes('iam/policies') && request.method === 'POST') {
          return of(new HttpResponse({ status: 201, body: 'success' }));
        }
      }

      if (this.featureFlagService.mockRewardsDb) {
        if (request.url.includes('/campaigns') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: this.campaigns }));
        }

        if (request.url.includes('/campaigns') && request.method === 'POST') {
          return of(new HttpResponse({ status: 201, body: 'success' }));
        }
      }

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

// export const FakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendInterceptor,
//   multi: true
// };
