import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/modules/authentication';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authed: boolean;
  preAuth: boolean;
  failedAuth: boolean;

  loginFormGroup: FormGroup;
  hidePw: boolean = true;
  currentYear: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;

    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
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
                () => {
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
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      accountID: new FormControl('', [Validators.required]),
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginFormGroup.controls[controlName].hasError(errorName);
  }

  handleSubmit(): void {
    if (this.loginFormGroup.valid) {
      // call login api
      this.router.navigate(['/dashboard/summary'], { relativeTo: this.route });
    }
  }
}
