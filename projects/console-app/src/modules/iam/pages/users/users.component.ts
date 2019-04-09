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
import { MatButtonToggleChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<IamUser>>;
  tableHeaders: {key: string, value: string}[];
  showModal: boolean;

  selection: SelectionModel<IamUser>;
  removeUsersResponse$: Observable<Response>;

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
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
    this.router.navigate(['new-user'], {relativeTo: this.activatedRoute});
  }

  removeUsers() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(user => {
      this.iamService.removeUser(user.id).subscribe(() => {
        this.fetchUsers();
      });
    });
  }

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        if (this.selection) {
          this.selection.clear();
        }
        this.fetchUsers();
        break;
      case 'settings':
        break;
      case 'help':
        break;
    }
  }

  private removeDialogComponentFromBody() {
    this.dismissableElement.nativeElement.remove();
  }

  closeButtonClick() {
    this.removeDialogComponentFromBody();
  }

  private fetchUsers() {
    this.document$ = this.iamService.fetchUsers();
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }
}
