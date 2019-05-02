import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IamService, IamUser, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  id: number;
  action: string;
  private sub: any;
  group$: Observable<any>;
  tableHeaders: { key: string, value: string }[];
  selection: SelectionModel<IamUser>;
  shownColumns: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService) { }

  ngOnInit() {
    this.shownColumns = ['username', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.action = params['action'];
    });
    if (this.action === 'Add') {
      this.fetchUsersNotInGroup();
    } else {
      this.fetchUsersInGroup();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getUserInfo(user: IamUser) {
    const userDetails = { id: user.id };
    const keys = Object.keys(user.getColumnProperties());

    keys.forEach(key => {
      userDetails[key] = user[key];
    });

    return userDetails;
  }

  private getGroupInfo(group: IamGroup, users: IamUser[]) {
    const groupInfo =  {
      id: group.id,
      users: users.map(user => {
        return this.getUserInfo(user);
      }),
      link: `groups/${group.id}`
    };
    return groupInfo;
  }

  private fetchUsersNotInGroup() {
    this.group$ = combineLatest(this.iamService.fetchUsers(), this.iamService.fetchGroup(this.id)).pipe(
      map(([usersData, groupData]) => {
        const iamUsers = usersData.getModels();
        const usersInGroup = groupData.users || [];

        const users = iamUsers.filter(singleUser => {
          const notInGroup = usersInGroup.indexOf(singleUser) === -1;
          if (notInGroup) {
            return singleUser;
          }
        });
        const groupDetails = this.getGroupInfo(groupData, users);

        return groupDetails;
      })
    );
  }

  private fetchUsersInGroup() {
    this.group$ = this.iamService.fetchGroup(this.id).pipe(
      map(group => {
        const users = group.users || [];
        const groupDetails = this.getGroupInfo(group, users);

        return groupDetails;
      })
    );
  }

  get columnProperties() {
    return IamUser.prototype.getColumnProperties();
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }

  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  manageUser() {
    console.log(this.selection);
  }
}
