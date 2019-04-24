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

import { CognitoService } from '@perx/open-services';
import { CognitoUser as CUser } from '@perx/open-services';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<CUser>>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    // this.usersSubsription.unsubscribe();
  }

  addUser() {
    this.openModal();
    // this.cognitoService.addUser();
    // this.users$ = this.cognitoService.fetchUsers();
    // return;
  }

  removeUsers(id: number|string) {
    // // todo: import from mock user list
    // this.cognitoService.removeUser(id);
    // this.users$ = this.cognitoService.fetchUsers();

    // return;
  }

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        this.fetchUsers();
        break;
      case 'settings':
        break;
      case 'help':
        break;
    }
  }

  openModal() {
    // this.showModal = true;
    this.router.navigate(['new-user'], { relativeTo: this.activatedRoute });
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

  private fetchUsers() {
    this.document$ = this.cognitoService.fetchUsers();
  }
}
