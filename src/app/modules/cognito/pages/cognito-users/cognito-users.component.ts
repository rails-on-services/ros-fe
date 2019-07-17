import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
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
  selector: 'app-cognito-users',
  templateUrl: './cognito-users.component.html',
  styleUrls: ['./cognito-users.component.scss']
})
export class CognitoUsersComponent implements OnInit {
  @Output() attachUsersToPool: EventEmitter<any> = new EventEmitter();
  @Output() detachUsersFromPool: EventEmitter<any> = new EventEmitter();
  @Input() tabMode: string;
  @Input() poolId: number;
  document$: Observable<JsonApiQueryData<CUser>>;
  users$: Observable<any[]>;
  showModal: boolean;

  userTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<CUser>;
  shownColumns$: Observable<(string | number | symbol)[]>;
  shownColumns: (string | number | symbol)[];
  groupLinkUrlRoot: string = '../groups/';

  @ViewChild('dismissible') private dismissibleElement: ElementRef;

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

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.userTableDisplayProperties);
    this.fetchUsers();
  }

  addUser(): void {
    this.router.navigate(['new-user'], { relativeTo: this.activatedRoute });
  }

  removeUsers(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(user => {
      this.cognitoService.removeUser(user.id).subscribe(() => {
        this.fetchUsers();
      });
    });
  }

  attachUsers(): void {
    this.attachUsersToPool.emit();
  }

  detachUsers(): void {
    this.detachUsersFromPool.emit(this.selection);
  }

  showDetachConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Detach Users',
        content: 'Are you sure you want to detach the users from group',
        btnColor: 'warn',
        action: 'Detach'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDetach => {
      if (shouldDetach) {
        this.detachUsers();
      }
    });
  }

  showDeleteConfirmationPopup(): void {
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

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchUsers(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  private removeDialogComponentFromBody(): void {
    this.dismissibleElement.nativeElement.remove();
  }

  closeButtonClick(): void {
    this.removeDialogComponentFromBody();
  }

  fetchUsers(force: boolean = false): void {

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

  get columnProperties(): TableHeaderProperties[] {
    return this.userTableDisplayProperties;
  }

  onUsersSelectionChange(selection: SelectionModel<CUser>): void {
    this.selection = selection;
  }

  clearSelection(): void {
    this.selection.clear();
  }
}
