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
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal
} from '@perx/open-ui-components';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableContentService } from 'src/shared/services/table-content/table-content.service';
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
  groupLinkUrlRoot = '../groups/';


  shownColumns: (string | number | symbol)[] = [];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
    public dialog: MatDialog,
    private tableContent: TableContentService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
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

    this.users$ = this.iamService.fetchUsers(force).pipe(
      map((users: IamUser[]) => {
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

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }
}
