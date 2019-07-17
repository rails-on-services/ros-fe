import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {

  // accessToken: string;
  // refreshToken: string;

  /**
   * Get access token
   * returns {Observable<string>}
   */

  public static getAccessToken(): Observable<string> {
    // const token: string = this.accessToken;
    const token: string = localStorage.getItem('accessToken') as string;
    return of(token);
  }

  /**
   * Get refresh token
   * returns {Observable<string>}
   */
  public static getRefreshToken(): Observable<string> {
    // const token: string = this.refreshToken;
    const token: string = localStorage.getItem('refreshToken') as string;
    return of(token);
  }

  /**
   * Remove tokens
   */
  public static clear(): void {
    // this.accessToken = null;
    // this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Set access token
   * returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    // this.accessToken = token;
    localStorage.setItem('accessToken', token);

    return this;
  }

  /**
   * Set refresh token
   * returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    // this.refreshToken = token;
    localStorage.setItem('refreshToken', token);

    return this;
  }
}
