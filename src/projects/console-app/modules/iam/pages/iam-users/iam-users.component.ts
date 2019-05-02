import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { IamService, IamUser } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal,
  ManageColumnModal
} from '@perx/open-ui-components';

@Component({
  selector: 'app-users',
  templateUrl: './iam-users.component.html',
  styleUrls: ['./iam-users.component.scss']
})
export class IamUsersComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<IamUser>>;
  users$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  selection: SelectionModel<IamUser>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(IamUser.prototype.getColumnProperties());
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    // this.usersSubsription.unsubscribe();
  }

  addUser() {
    this.router.navigate(['new-user'], { relativeTo: this.activatedRoute });
  }

  removeUsers() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(user => {
      this.iamService.removeUser(user.id).subscribe(() => {
        this.selection.deselect(user);
        this.fetchUsers();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const header = this.selection.selected.length > 1 ? 'Deleting Users' : 'Deleting User';
    const content = this.selection.selected.length > 1 ?
      'Are you sure you want to delete the users' :
      'Are you sure you want to delete the user';
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header,
        content,
        btnColor: 'warn',
        action: 'Delete'
       }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeUsers();
      }
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
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: IamUser.prototype.getColumnProperties(),
            selected: this.shownColumns
          }
        }).componentInstance.selectionChange;
        this.shownColumns$.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
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
    this.users$ = this.iamService.fetchUsers().pipe(
      map(document => {
        const iamUsers: IamUser[] = document.getModels();
        const users = iamUsers.map(iamUser => {
          const groups = iamUser.groups || [];
          const user = {
            id: iamUser.id,
            username: {
              value: iamUser.username,
              link: `/users/${iamUser.id}`
            },
            groups: groups.map(group => ({
              value: group.name,
              link: `groups/${group.id}`
            })),
            urn: iamUser.urn,
            apiAccess: iamUser.apiAccess,
            consoleAccess: iamUser.consoleAccess
          };

          return user;
        });

        return users;
      })
    );
  }

  get columnProperties() {
    return IamUser.prototype.getColumnProperties();
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }
}
