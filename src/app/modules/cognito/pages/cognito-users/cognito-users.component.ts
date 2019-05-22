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

import { CognitoService, IamUser } from '@perx/open-services';
import { CognitoUser as CUser } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-users',
  templateUrl: './cognito-users.component.html',
  styleUrls: ['./cognito-users.component.scss']
})
export class CognitoUsersComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<CUser>>;
  users$: Observable<any[]>;
  showModal: boolean;

  displayProperties: object;
  userTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<CUser>;
  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.userTableDisplayProperties = this.displayProperties['essentials']['cognito']['tables']['users-table'];
 
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.userTableDisplayProperties);

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
      this.cognitoService.removeUser(user.id).subscribe(() => {
        this.fetchUsers();
      });
    });
  }


  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      width: '30vw',
      data: { type: 'user' }
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
          this.displayProperties['essentials']['cognito']['tables']['users-table'] = this.userTableDisplayProperties;
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

  private fetchUsers() {
    this.users$ = this.cognitoService.fetchUsers().pipe(
      map(document => {
        const cognitoUsers = document.getModels();
        const users = cognitoUsers.map(cognitoUser => {
          const user = { id: cognitoUser.id };
          const keys = this.userTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            user[key] = cognitoUser[key];
          });

          return user;
        });

        return users;
      })
    );
  }

  get columnProperties() {
    return this.userTableDisplayProperties;
  }

  onUsersSelectionChange(selection: SelectionModel<CUser>) {
    this.selection = selection;
  }
}
