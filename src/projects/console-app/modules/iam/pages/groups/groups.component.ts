import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { IamService, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
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
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(IamGroup.prototype.getColumnProperties());

    this.fetchGroups();
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
        if (!this.selection || this.selection.selected.length <= 0) {
          return;
        }
        this.selection.selected.forEach(group => {
          this.iamService.fetchGroup(group.id).subscribe(groupModel => {
            groupModel.name = newName;
            groupModel.save().subscribe();
            this.fetchGroups();
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

  private fetchGroups() {
    this.groups$ = this.iamService.fetchGroups().pipe(
      map(document => {
        const iamUsers = document.getModels();
        const users = iamUsers.map(iamUser => {
          const user = { id: iamUser.id };
          const keys = Object.keys(iamUser.getColumnProperties());

          keys.forEach(key => {
            user[key] = iamUser[key];
          });

          return user;
        });

        return users;
      })
    );
  }

  get columnProperties() {
    return IamGroup.prototype.getColumnProperties();
  }

  onGroupsSelectionChange(selection: SelectionModel<IamGroup>) {
    this.selection = selection;
  }
}
