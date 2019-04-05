import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../../shared/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debug} from 'util';
import {IamService} from '@whistler/iam';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, AfterViewInit {
  userDetailsGroup: FormGroup;
  isEditable = true;

  userName: string;
  hasProgrammaticAccess: boolean;
  hasConsoleAccess: boolean;

  createUsernamePage: boolean;
  reviewPage: boolean;

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
    // console.log(this.userDetailsGroup.value); // outputs values in object format

    // save to api
    this.iamService.addUser();
    this.router.navigate(['../'], {relativeTo: this.route});

  }
}
