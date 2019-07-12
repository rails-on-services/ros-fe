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

  displayProperties: object;
  userTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns$: Observable<(string | number | symbol)[]>;
  shownColumns: (string | number | symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.userTableDisplayProperties = this.displayProperties['essentials']['IAM']['tables']['users-table'];
  }

  ngOnInit() {
    this.shownColumns = ['username', 'type'];
    this.fetchUsers();
  }

  private fetchUsers() {
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

  get columnProperties() {
    return [
      { key: 'username', name: 'User Name', sortable: true, display: true },
      { key: 'type', name: 'Type', sortable: true, display: true }
    ];
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }
  showAttachConfirmationPopup() {
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
