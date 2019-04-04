import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';

import { IamService, IamUser } from '@whistler/iam';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<IamUser>>;
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
      {key: 'username', value: 'User name'},
      {key: 'urn', value: 'URN'},
      {key: 'console', value: 'Console access'},
      {key: 'api', value: 'API access'}
    ];
    this.document$ = this.iamService.fetchUsers();
  }

  ngOnDestroy(): void {
    // this.usersSubsription.unsubscribe();
  }

  addUser() {
    // this.openModal();
    // this.iamService.addUser();
    // this.users$ = this.iamService.fetchUsers();
    // return;
  }

  removeUsers(id: number | string) {
    // // todo: import from mock user list
    // this.iamService.removeUser(id);
    // this.users$ = this.iamService.fetchUsers();

    // return;
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
