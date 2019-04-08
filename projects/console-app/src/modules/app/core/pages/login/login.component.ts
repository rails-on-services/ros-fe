import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {AuthenticationService} from '../../../../../shared/modules/authentication';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'perx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authed: boolean;
  preAuth: boolean;
  failedAuth: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;

  }

  ngOnInit() {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId) && !this.authService.authing) {
        this.authService.isAuthorized().subscribe(
          authed => {
            if (!authed) {
              this.authService.autoLogin().then(
                (isAuthed: boolean) => {
                  this.authed = isAuthed;
                  if (this.authed) {
                    this.router.navigateByUrl(this.authService.getInterruptedUrl());
                  }
                },
                (err) => {
                  this.failedAuth = true;
                  this.authed = false;
                }
              );
            } else {
              this.authed = authed;
            }

          },
        );
      }
    }
  }

}
