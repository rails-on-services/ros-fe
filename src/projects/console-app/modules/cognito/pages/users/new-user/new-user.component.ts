import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../../../../shared/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IamService, IamUser} from '@perx/open-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, AfterViewInit {
  userDetailsGroup: FormGroup;
  isEditable = true;

  createUsernamePage: boolean;
  reviewPage: boolean;

  user$: Observable<IamUser>;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private iamService: IamService) {
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
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  submitForm() {
    console.log(this.userDetailsGroup.value); // outputs values in object format


    // save to api
    const user = {
      username: this.userDetailsGroup.get('userName').value,
      api: this.userDetailsGroup.get('hasProgrammaticAccess').value,
      console: this.userDetailsGroup.get('hasConsoleAccess').value,
    };

    this.user$ = this.iamService.createUser(user);
    // this.router.navigate(['../'], {relativeTo: this.route});
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
