import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import { IamService, IamUser } from '@whistler/iam';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<IamUser[]>;
  tableHeaders: {key: string, value: string}[];
  showModal: boolean;

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.tableHeaders = [
      {key: 'id', value: 'ID'},
      {key: 'username', value: 'Username'},
    ];
    this.users$ = this.iamService.fetchUsers();
  }

  addUser() {
    // todo: fill in adding mock user
    this.openModal();
    this.iamService.addUser();
    this.users$ = this.iamService.fetchUsers();
    return;
  }

  removeUsers() {
    // todo: import from mock user list
    return;
  }

  openModal() {
    // this.showModal = true;
    this.router.navigate(['new-user'], {relativeTo: this.activatedRoute});
  }

  closeModal() {
    // this.showModal = false;
  }

  private removeDialogComponentFromBody() {
    this.dismissableElement.nativeElement.remove();
  }

  closeButtonClick() {
    this.removeDialogComponentFromBody();
  }

}
