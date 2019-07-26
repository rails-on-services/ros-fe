import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IamService, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, from } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map, tap, switchMap } from 'rxjs/operators';
import { ConfirmationModal, RenameModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableContentService } from 'src/shared/services/table-content/table-content.service';

@Component({
  selector: 'app-iam-groups',
  templateUrl: './iam-groups.component.html',
  styleUrls: ['./iam-groups.component.scss']
})
export class IamGroupsComponent implements OnInit {
  @Output() attachGroupsToUser: EventEmitter<any> = new EventEmitter();
  @Output() detachGroupsFromUser: EventEmitter<any> = new EventEmitter();
  @Input() tabMode: string;
  @Input() userId: number;

  document$: Observable<JsonApiQueryData<IamGroup>>;
  testGroupList: Observable<IamGroup[]>;
  groups$: Observable<any[]>;

  showModal: boolean;
  groupTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<IamGroup>;

  shownColumns: (string | number | symbol)[];
  userLinkUrlRoot: string = '../users/';

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private tableContent: TableContentService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'groups-table');
    this.groupTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.groupTableDisplayProperties);
    this.fetchGroups();
  }

  attachGroups(): void {
    this.attachGroupsToUser.emit();
  }

  detachGroups(): void {
    this.detachGroupsFromUser.emit(this.selection);
  }

  removeGroups(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(group => {
      this.iamService.removeGroup(group.id).subscribe(() => {
        this.fetchGroups();
      });
    });
  }

  showDetachConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Detach Groups',
        content: 'Are you sure you want to detach the groups from user',
        btnColor: 'warn',
        action: 'Detach'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDetach => {
      if (shouldDetach) {
        this.detachGroups();
      }
    });
  }

  showDeleteConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Group',
        content: 'Are you sure you want to delete the group',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeGroups();
      }
    });
  }

  editGroupNamePopup(): void {
    let newName = '';
    const confirmPopup = this.dialog.open(RenameModal, {
      minWidth: '300px',
      data: { type: 'group' }
    });

    confirmPopup.afterClosed().pipe(
      tap(nameTemp => newName = nameTemp),
      switchMap(nameTemp => {
        if (nameTemp) {
          return from(this.selection.selected);
        } else {
          return from([]);
        }
      }),
      switchMap(group => this.iamService.fetchGroup(group.id)),
      map(groupModel => { groupModel.name = newName; return groupModel; }),
      switchMap(groupModel => groupModel.save())
    ).subscribe(
      () => {
        this.fetchGroups();
      }
    );

  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchGroups();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  fetchGroups(): void {
    // API is not ready for this userId checking
    this.groups$ = this.iamService.fetchGroups(this.userId).pipe(
      map(iamGroups => {
        const groups = iamGroups.map(iamGroup => {
          const groupLink = this.tabMode ? `../../groups/${iamGroup.id}` : `${iamGroup.id}`;
          return {
            id: iamGroup.id,
            name: iamGroup.name,
            name_link: groupLink,
            users: this.tableContent.generateTableMultiLinksContent(iamGroup.users, iamGroup.id, this.userLinkUrlRoot, 'username'),
            urn: iamGroup.urn,
            creationTime: iamGroup.creationTime,
            attachedPolicies: iamGroup.attachedPolicies
          };
        });
        return groups;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.groupTableDisplayProperties;
  }

  onGroupsSelectionChange(selection: SelectionModel<IamGroup>): void {
    this.selection = selection;
  }

  clearSelection(): void {
    this.selection.clear();
  }
}
