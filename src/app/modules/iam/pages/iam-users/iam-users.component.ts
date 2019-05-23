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
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';

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
  displayProperties: object;
  userTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<IamUser>;

  shownColumns: (string | number | symbol)[] = [];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.userTableDisplayProperties = this.displayProperties['essentials']['IAM']['tables']['users-table'];
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.userTableDisplayProperties);
    this.fetchUsers(true);
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
        this.fetchUsers(true);
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
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.userTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.userTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.userTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['IAM']['tables']['users-table'] = this.userTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
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

  private fetchUsers(force = false) {
    this.users$ = this.iamService.fetchUsers(force).pipe(
      map((users: IamUser[]) => {
        return users.map(user => {
          const groups = [...(user.groups || [])];
          groups.splice(3);
          return {
            id: user.id,
            username: user.username,
            username_link: `${user.id}`,
            groups: groups.length <= 0 ? 'None' : groups.map((group, index) => {
              if (index === groups.length - 1 && groups.length < user.groups.length) {
                return {
                  value: `${user.groups.length - groups.length + 1} more`,
                  link: `${user.id}`
                }
              }
              return {
                value: group.name,
                link: `../groups/${group.id}`
              }
            }),
            urn: user.urn,
            apiAccess: user.apiAccess,
            consoleAccess: user.consoleAccess
          }
        });
      })
    );
  }

  get columnProperties() {
    return this.userTableDisplayProperties;
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }
}
