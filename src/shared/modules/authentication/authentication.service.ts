import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { CognitoService } from '@perx/open-services';
import { TokenStorage } from './token-storage.service';
import { environment } from '../../../environments/environment';

// interface AccessData {
//   refreshToken: string;
//   preAuthToken: string;
// }

@Injectable()
export class AuthenticationService implements AuthService {

  lastURL: string;
  authing: boolean;
  retries = 0;
  preAuthJWT: string;

  constructor(
    private tokenStorage: TokenStorage,
    private cognitoService: CognitoService
  ) {
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return TokenStorage
      .getAccessToken()
      .pipe(map(token => {
        return !!token;
      }));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return TokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<any> {

    if (environment.preAuth) {
      return this.preAuth().pipe(
        tap((resp) => {
          /* check if valid auth  */
          this.retries++;
          if (resp) {
            this.userAuth(this.preAuthJWT).toPromise().then(
              () => {
                const userBearer = resp.headers.get('Authorization');
                if (userBearer) {
                  this.tokenStorage.setAccessToken(userBearer.split(' ')[1]);

                }
              },
              () => {
                return of(this.logout());
              }
            );
          }
        }),
      );
    }

    // todo: implement traditional auth refresh token path
    return of();

    // return this.tokenStorage
    //   .getRefreshToken()
    //   .pipe(
    //     switchMap((refreshToken: string) =>
    //       this.http.post(`http://localhost:3000/preauth`, {refreshToken})
    //     ),
    //     tap((tokens: string) => this.saveAccessData(tokens)),
    //     catchError((err) => {
    //       this.logout();
    //
    //       return Observable.throw(err);
    //     })
    //   );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < 3 && response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public async autoLogin() {
    this.authing = true;
    let success = false;

    const userAuthData = await this.userAuth(this.preAuthJWT).toPromise().catch(
      () => {
        console.log('login failed!');
        this.authing = false;
      }
    );
    // @ts-ignore
    // const userBearer = userAuthData.headers.get('Authorization');
    const userBearer = userAuthData.body.data[0].attributes.jwt;
    if (userBearer) {
      // this.tokenStorage.setAccessToken(userBearer.split(' ')[1]);
      this.tokenStorage.setAccessToken(userBearer);

      success = true;
    }
    // this.preAuth().toPromise().then(
    //   (resp) => {
    //     /* check if valid auth  */
    //     const appAuthBearer = resp.headers.get('Authorization');
    //     if (appAuthBearer) {
    //       this.userAuth(appAuthBearer).toPromise().then(
    //         (res) => {
    //           const userBearer = resp.headers.get('Authorization');
    //           if (userBearer) {
    //             this.tokenStorage.setAccessToken(userBearer.split(' ')[1]);
    //
    //             // @ts-ignore
    //             const configURL = res.body.data[0].links.self;
    //
    //             success = true;
    //           }
    //         },
    //         (err) => {
    //           return err;
    //         }
    //       );
    //     }
    //   },
    //   err => console.log('HTTP error', err)
    // );
    this.authing = false;
    return success;
  }

  public userAuth(bearer: string) {
    const userId = this.getUrlParameter('primary_identifier');
    return this.cognitoService.authenticateUser(bearer, userId);
  }

  public preAuth() {
    return this.cognitoService.authenticateAppWithPreAuth(location.host).pipe(
      tap((resp) => {
        // @ts-ignore
        this.preAuthJWT = resp.headers.get('Authorization');
        return resp;
      })
    );
  }

  public setInterruptedUrl(url: string): void {
    this.lastURL = url;
  }

  public getInterruptedUrl(): string {
    return this.lastURL;
  }

  /**
   * Logout
   */
  public logout(): void {
    TokenStorage.clear();
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {String} accessToken
   */
  // private saveAccessData(accessToken: string) {
  //   this.tokenStorage.setAccessToken(accessToken);
  // }


  private getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(this.getInterruptedUrl());
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
