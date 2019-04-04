import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../../shared/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, AfterViewInit {

  userName: string;
  hasProgrammaticAccess: boolean;
  hasConsoleAccess: boolean;

  createUsernamePage: boolean;
  reviewPage: boolean;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
    this.createUsernamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  backClicked() {
    this.createUsernamePage = true;
    this.reviewPage = false;
  }

  cancelClicked() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  reviewClicked() {
    this.createUsernamePage = false;
    this.reviewPage = true;
  }

  finishClicked() {
    // create user on api
    this.router.navigate(['../'], {relativeTo: this.route});

  }
}
