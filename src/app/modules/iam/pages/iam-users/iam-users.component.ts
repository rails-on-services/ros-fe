import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
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
  selector: 'app-iam-users',
  templateUrl: './iam-users.component.html',
  styleUrls: ['./iam-users.component.scss']
})
export class IamUsersComponent implements OnInit {
  @Output() attachUsersToGroup: EventEmitter<any> = new EventEmitter();
  @Output() detachUsersFromGroup: EventEmitter<any> = new EventEmitter();
  @Input() groupId: number;
  @Input() tabMode: string;

  document$: Observable<JsonApiQueryData<IamUser>>;
  users$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;
  userTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<IamUser>;
  groupLinkUrlRoot: string = '../groups/';


  shownColumns: (string | number | symbol)[] = [];

  @ViewChild('dismissible') private dismissibleElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private iamService: IamService,
    public dialog: MatDialog,
    private tableContent: TableContentService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'users-table');
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
      this.iamService.removeUser(user.id).subscribe(() => {
        this.selection.deselect(user);
        this.fetchUsers(true);
      });
    });
  }

  attachUsers(): void {
    this.attachUsersToGroup.emit();
  }

  detachUsers(): void {
    this.detachUsersFromGroup.emit(this.selection);
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
    if (this.groupId) {
      force = true;
    }
    this.users$ = this.iamService.fetchUsers(this.groupId, force).pipe(
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

  get columnProperties(): TableHeaderProperties[] {
    return this.userTableDisplayProperties;
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>): void {
    this.selection = selection;
  }

  clearSelection(): void {
    this.selection.clear();
  }

}
