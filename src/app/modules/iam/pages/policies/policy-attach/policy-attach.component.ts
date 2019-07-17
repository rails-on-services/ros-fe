import { Component, OnInit } from '@angular/core';
import { IamService, IamUser, IamGroup } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-policy-attach',
  templateUrl: './policy-attach.component.html',
  styleUrls: ['./policy-attach.component.scss']
})
export class PolicyAttachComponent implements OnInit {
  users$: Observable<any[]>;
  groups$: Observable<any[]>;
  content$: Observable<any[]>;

  selection: SelectionModel<IamUser | IamGroup>;

  userTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns$: Observable<(string | number | symbol)[]>;
  shownColumns: (string | number | symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) { }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'users-table');
    this.shownColumns = ['username', 'type'];
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.content$ = forkJoin(this.iamService.fetchUsers(), this.iamService.fetchGroups()).pipe(
      map(([usersData, groupsData]) => {
        const allUsers = [...usersData, ...groupsData];

        const users = allUsers.map(singleUser => {
          const userDetails = { id: singleUser.id };
          const keys = this.userTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            userDetails[key] = singleUser[key];
          });
          userDetails[`username`] = singleUser.username || singleUser.name;
          userDetails[`type`] = singleUser.type;
          return userDetails;
        });

        return users;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return [
      { key: 'username', name: 'User Name', sortable: true, display: true },
      { key: 'type', name: 'Type', sortable: true, display: true }
    ];
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>): void {
    this.selection = selection;
  }
  showAttachConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Attach Policy',
        content: 'Are you sure you want to attach the policy to the users',
        btnColor: 'primary',
        action: 'Confirm'
      }
    });

    confirmPopup.afterClosed().subscribe(confirm => {
      if (confirm) {
        console.log('Attach policy action place holder');
      }
    });
  }
}
