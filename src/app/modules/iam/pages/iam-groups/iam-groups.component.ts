import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { IamService, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';

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
  selection: SelectionModel<IamGroup>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(IamGroup.prototype.getColumnProperties());

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
                this.fetchGroups();
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
        this.fetchGroups();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: IamGroup.prototype.getColumnProperties(),
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

  fetchGroups(force?: boolean) {
    //API is not ready for this userId checking
    // force = this.userId ? true : false;
    this.groups$ = this.iamService.fetchGroups().pipe(
      map(iamGroups => {
        const groups = iamGroups.map(iamGroup => {
          const groupLink = this.tabMode ? `../../groups/${iamGroup.id}` : `${iamGroup.id}`;
          const group = { id: iamGroup.id };
          const keys = Object.keys(iamGroup.getColumnProperties());

          keys.forEach(key => {
            group[key] = iamGroup[key];
          });
          group['name'] = {
            value: iamGroup.name,
            link: groupLink
          };
          return group;
        });

        return groups;
      })
    );
  }

  get columnProperties() {
    return IamGroup.prototype.getColumnProperties();
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
