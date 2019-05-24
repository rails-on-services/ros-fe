import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { IamService, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-iam-groups',
  templateUrl: './iam-groups.component.html',
  styleUrls: ['./iam-groups.component.scss']
})
export class IamGroupsComponent implements OnInit {
  @Output() attachGroupsToUser = new EventEmitter();
  @Output() detachGroupsFromUser = new EventEmitter();
  @Input() tabMode: string;
  @Input() userId: number;

  document$: Observable<JsonApiQueryData<IamGroup>>;
  testGroupList: Observable<IamGroup[]>;
  groups$: Observable<any[]>;

  showModal: boolean;
  displayProperties: object;
  groupTableDisplayProperties: TableHeaderProperties[] = [];
  selection: SelectionModel<IamGroup>;

  shownColumns: (string|number|symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.groupTableDisplayProperties = this.displayProperties['essentials']['IAM']['tables']['groups-table'];

  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.groupTableDisplayProperties);

    this.fetchGroups();
  }

  attachGroups() {
    this.attachGroupsToUser.emit();
  }

  detachGroups() {
    this.detachGroupsFromUser.emit(this.selection);
  }

  removeGroups() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(group => {
      this.iamService.removeGroup(group.id).subscribe(() => {
        this.fetchGroups();
      });
    });
  }

  showDetachConfirmationPopup() {
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

  showDeleteConfirmationPopup() {
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

  editGroupNamePopup() {
    const confirmPopup = this.dialog.open(RenameModal, {
      minWidth: '300px',
      data: { type: 'group' }
    });

    confirmPopup.afterClosed().subscribe(newName => {
      if (newName) {
        this.selection.selected.forEach(group => {
          this.iamService.fetchGroup(group.id).subscribe(groupModel => {
            groupModel.name = newName;
            groupModel.save().subscribe(
              () => {
                this.fetchGroups(true);
              }
            );
          });
        });
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
        this.fetchGroups(true);
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.groupTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.groupTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.groupTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['IAM']['tables']['groups-table'] = this.groupTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
  }

  fetchGroups(force?: boolean) {
    //API is not ready for this userId checking
    if (this.userId) {
      force = true;
    }
    this.groups$ = this.iamService.fetchGroups().pipe(
      map(iamGroups => {
        const groups = iamGroups.map(iamGroup => {
          const groupLink = this.tabMode ? `../../groups/${iamGroup.id}` : `${iamGroup.id}`;
          const group = { id: iamGroup.id };
          const keys = this.groupTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            group[key] = iamGroup[key];
          });
          group['name_link'] = groupLink;
          return group;
        });

        return groups;
      })
    );
  }

  get columnProperties() {
    return this.groupTableDisplayProperties;
  }

  onGroupsSelectionChange(selection: SelectionModel<IamGroup>) {
    this.selection = selection;
  }

  clearSelection() {
    this.selection.clear();
  }

  // addUsersToGroup() {
  //   this.router.navigate(['user-management', {id: this.selection.selected[0].id, action: 'Add'}], {relativeTo: this.route});
  // }

  // removeUsersFromGroup() {
  //   this.router.navigate(['user-management', {id: this.selection.selected[0].id, action: 'Remove'}],  {relativeTo: this.route});
  // }
}
