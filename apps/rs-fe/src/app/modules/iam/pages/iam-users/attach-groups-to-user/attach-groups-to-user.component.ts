import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IamGroup, IamService, IamUser } from '@perx/open-services/dist/open-services';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-groups-to-user',
  templateUrl: './attach-groups-to-user.component.html',
  styleUrls: ['./attach-groups-to-user.component.scss']
})
export class AttachGroupsToUserComponent implements OnInit, OnDestroy {
  private sub: any;
  userId: number;
  selection: SelectionModel<IamGroup>;
  shownColumns: (string | number | symbol)[];
  user$: Observable<any>;
  allGroups$: Observable<any>;
  currentUser$: Observable<any>;
  groupTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
  }

  ngOnInit(): void {
    this.shownColumns = ['name', 'content', 'status', 'createdAt', 'updatedAt'];
    this.sub = this.route.params.subscribe(params => {
      this.userId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'groups-table');
    this.groupTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allGroups$ = this.iamService.fetchGroups();
    this.currentUser$ = this.iamService.fetchUser(this.userId);
    this.fetchGroupsNotInUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getGroupInfo(group: IamGroup) {
    const groupDetails = { id: group.id };
    const keys = this.groupTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      groupDetails[key] = group[key];
    });

    return groupDetails;
  }

  // tslint:disable-next-line: typedef
  getUserInfo(user: IamUser, groups: IamGroup[]) {
    const userInfo = {
      id: user.id,
      groups: groups.map(group => {
        return this.getGroupInfo(group);
      }),
      link: `users/${user.id}`
    };
    return userInfo;
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  private fetchGroupsNotInUser(): void {
    this.user$ = forkJoin(this.allGroups$, this.currentUser$).pipe(
      map(([groupsData, userData]) => {
        const groupsInUser = userData.groups || [];
        const groups = groupsData.filter(singleGroup => {
          if (groupsInUser.length <= 0) { return true; }
          const isInUser = groupsInUser.some(groupInUser => {
            return groupInUser.id === singleGroup.id;
          });

          return !isInUser;
        });
        const userDetails = this.getUserInfo(userData, groups);

        return userDetails;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.groupTableDisplayProperties;
  }

  onGroupsSelectionChange(selection: SelectionModel<IamGroup>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachGroupsToUser(): void {
    const selectedGroupIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allGroups$, this.currentUser$).pipe(
      map(([groupsData, userData]) => {
        const selectedGroups = groupsData.filter(group => selectedGroupIds.includes(group.id));
        userData.groups = [...userData.groups || [], ...selectedGroups].map(group => {
          delete group.internalDatastore;
          delete group.users;
          return group;
        });
        return userData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
