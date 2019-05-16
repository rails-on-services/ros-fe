import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { IamService, IamUser, IamGroup } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-group-users',
  templateUrl: './add-group-users.component.html',
  styleUrls: ['./add-group-users.component.scss']
})
export class AddGroupUsersComponent implements OnInit, OnDestroy {
  id: number;
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
    });
    this.fetchUsersNotInGroup();
    
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
    this.group$ = forkJoin(this.iamService.fetchUsers(), this.iamService.fetchGroup(this.id)).pipe(
      map(([usersData, groupData]) => {
        const usersInGroup = groupData.users || [];

        const users = usersData.filter(singleUser => {
          const notInGroup = usersInGroup.some(userInGroup => {
            return userInGroup.id !== singleUser.id;
          });
          if (notInGroup) {
            return singleUser;
          }
        });
        const groupDetails = this.getGroupInfo(groupData, users);

        return groupDetails;
      })
    );
  }

  //Later can move this to group detail page to fetch group users
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

  addUsersToGroup() {
    console.log(this.selection);
  }
}
