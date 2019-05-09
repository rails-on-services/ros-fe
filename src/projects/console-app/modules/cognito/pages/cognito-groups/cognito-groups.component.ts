import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CognitoService, CognitoGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';

@Component({
  selector: 'app-cognito-groups',
  templateUrl: './cognito-groups.component.html',
  styleUrls: ['./cognito-groups.component.scss']
})
export class CognitoGroupsComponent implements OnInit {
  groups$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CognitoGroup>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CognitoGroup.prototype.getColumnProperties());

    this.fetchGroups();
  }


  removeGroups() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(group => {
      this.cognitoService.removeGroup(group.id).subscribe(() => {
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
        this.selection.selected.forEach(group => {
          this.cognitoService.fetchGroup(group.id).subscribe(groupModel => {
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
            columnProperties: CognitoGroup.prototype.getColumnProperties(),
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
    this.groups$ = this.cognitoService.fetchGroups().pipe(
      map(data => {
        const cognitoGroups = data.getModels();
        const groups = cognitoGroups.map(cognitoGroup => {
          const group = { id: cognitoGroup.id };
          const keys = Object.keys(cognitoGroup.getColumnProperties());

          keys.forEach(key => {
            group[key] = cognitoGroup[key];
          });
          group['name'] = {
            value: cognitoGroup.name,
            link: `/groups/${cognitoGroup.id}`
          }
          return group;
        });

        return groups;
      })
    );
  }

  get columnProperties() {
    return CognitoGroup.prototype.getColumnProperties();
  }

  onGroupsSelectionChange(selection: SelectionModel<CognitoGroup>) {
    this.selection = selection;
  }
}