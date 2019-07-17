import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IamCredential, IamService, IamUser } from '@perx/open-services';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-iam-user.component.html',
  styleUrls: ['./new-iam-user.component.scss']
})
export class NewIamUserComponent implements OnInit, AfterViewInit {
  userDetailsGroup: FormGroup;
  isEditable: boolean = true;

  createUsernamePage: boolean;
  reviewPage: boolean;

  user$: Observable<IamUser>;
  credential$: Observable<IamCredential>;

  private userUnsubscribe$: Subject<void> = new Subject<void>();
  private credentialUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService
  ) {
    this.createUsernamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
    this.userDetailsGroup = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      hasProgrammaticAccess: new FormControl(false),
      hasConsoleAccess: new FormControl(false),
    });
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  hasError(controlName: string, errorName: string) {
    return this.userDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm(stepper: MatStepper) {
    const u = {
      username: this.userDetailsGroup.get('userName').value,
      api: this.userDetailsGroup.get('hasProgrammaticAccess').value,
      console: this.userDetailsGroup.get('hasConsoleAccess').value,
    };

    this.iamService.createUser(u).pipe(
      takeUntil(this.userUnsubscribe$),
      switchMap(user => this.iamService.createCredentialFor(user)),
      takeUntil(this.credentialUnsubscribe$)
    ).subscribe(() => {
      stepper.next();
    });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
