import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';

import { CognitoService } from '@perx/open-services';
import { CognitoUser as CUser } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmationModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableContentService } from 'src/shared/services/table-content/table-content.service';

@Component({
  selector: 'app-users',
  templateUrl: './cognito-users.component.html',
  styleUrls: ['./cognito-users.component.scss']
})
export class CognitoUsersComponent implements OnInit {
  document$: Observable<JsonApiQueryData<CUser>>;
  users$: Observable<any[]>;
  showModal: boolean;

  userTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<CUser>;
  shownColumns$: Observable<(string | number | symbol)[]>;
  shownColumns: (string | number | symbol)[];
  groupLinkUrlRoot = '../groups/';

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private tableContent: TableContentService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.userTableDisplayProperties);
    this.fetchUsers();
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

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchUsers(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }

  private removeDialogComponentFromBody() {
    this.dismissableElement.nativeElement.remove();
  }

  closeButtonClick() {
    this.removeDialogComponentFromBody();
  }

  private fetchUsers(force = false) {

    this.users$ = this.cognitoService.fetchUsers(force).pipe(
      map((users: CUser[]) => {
        return users.map(user => {
          return {
            id: user.id,
            username: user.username,
            username_link: `${user.id}`,
            groups: this.tableContent.generateTableMultiLinksContent(user.groups, user.id, this.groupLinkUrlRoot),
            urn: user.urn,
            apiAccess: user.apiAccess,
            consoleAccess: user.consoleAccess
          };
        });
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
