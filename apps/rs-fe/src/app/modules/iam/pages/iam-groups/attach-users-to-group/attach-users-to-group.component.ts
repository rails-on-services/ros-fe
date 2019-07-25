import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IamService, IamUser, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';

@Component({
  selector: 'app-attach-users-to-group',
  templateUrl: './attach-users-to-group.component.html',
  styleUrls: ['./attach-users-to-group.component.scss']
})
export class AttachUsersToGroupComponent implements OnInit, OnDestroy {
  private sub: any;
  groupId: number;
  selection: SelectionModel<IamUser>;
  shownColumns: (string | number | symbol)[];
  group$: Observable<any>;
  allUsers$: Observable<any>;
  currentGroup$: Observable<any>;
  userTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService) { }

  ngOnInit(): void {
    this.shownColumns = ['username', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allUsers$ = this.iamService.fetchUsers();
    this.currentGroup$ = this.iamService.fetchGroup(this.groupId);
    this.fetchUsersNotInGroup();

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  private getUserInfo(user: IamUser) {
    {
      const userDetails = { id: user.id };
      const keys = this.userTableDisplayProperties.map(item => item.key);

      keys.forEach(key => {
        userDetails[key] = user[key];
      });

      return userDetails;
    }
  }

  // tslint:disable-next-line: typedef
  private getGroupInfo(group: IamGroup, users: IamUser[]) {
    const groupInfo = {
      id: group.id,
      users: users.map(user => {
        return this.getUserInfo(user);
      }),
      link: `groups/${group.id}`
    };
    return groupInfo;
  }

  private fetchUsersNotInGroup(): void {
    this.group$ = forkJoin(this.allUsers$, this.currentGroup$).pipe(
      map(([usersData, groupData]) => {
        const usersInGroup = groupData.users || [];

        const users = usersData.filter(singleUser => {
          if (usersInGroup.length <= 0) { return true; }
          const isInGroup = usersInGroup.some(userInGroup => {
            return userInGroup.id === singleUser.id;
          });
          return !isInGroup;
        });
        const groupDetails = this.getGroupInfo(groupData, users);

        return groupDetails;
      })
    );
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.userTableDisplayProperties;
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachUsersToGroup(): void {
    const selectedUserIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allUsers$, this.currentGroup$).pipe(
      map(([usersData, groupData]) => {
        const selectedUsers = usersData.filter(user => selectedUserIds.includes(user.id));
        groupData.users = [...groupData.users || [], ...selectedUsers].map(user => {
          delete user.internalDatastore;
          delete user.groups;
          return user;
        });
        return groupData;
      }),
      switchMap(group => group.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
