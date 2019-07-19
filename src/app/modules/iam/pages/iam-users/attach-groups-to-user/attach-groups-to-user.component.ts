import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IamGroup, IamService, IamUser } from '@perx/open-services';
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
  templateTableDisplayProperties: TableHeaderProperties[] = [];

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
    this.templateTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allGroups$ = this.iamService.fetchGroups(undefined, true);
    this.currentUser$ = this.iamService.fetchUser(this.userId, true);
    this.fetchGroupsNotInUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getGroupInfo(template: IamGroup) {
    const templateDetails = { id: template.id };
    const keys = this.templateTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      templateDetails[key] = template[key];
    });

    return templateDetails;
  }

  // tslint:disable-next-line: typedef
  getUserInfo(user: IamUser, groups: IamGroup[]) {
    const userInfo = {
      id: user.id,
      groups: groups.map(template => {
        return this.getGroupInfo(template);
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

  fetchGroupsNotInUser(): void {
    this.user$ = forkJoin(this.allGroups$, this.currentUser$).pipe(
      map(([groupsData, userData]) => {
        const groupsInUser = userData.groups || [];
        const groups = groupsData.filter(singleGroup => {
          if (groupsInUser.length <= 0) { return true; }
          const isInUser = groupsInUser.some(templateInUser => {
            return templateInUser.id === singleGroup.id;
          });

          return !isInUser;
        });
        const userDetails = this.getUserInfo(userData, groups);

        return userDetails;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.templateTableDisplayProperties;
  }

  onGroupsSelectionChange(selection: SelectionModel<IamGroup>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEventsSelectionChange(selection: SelectionModel<IamGroup>): void {
    this.selection = selection;
  }

  attachGroupsToUser(): void {
    const selectedGroupIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allGroups$, this.currentUser$).pipe(
      map(([groupsData, userData]) => {
        console.log('groupsData', groupsData);
        const selectedGroups = groupsData.filter(group => selectedGroupIds.includes(group.id));
        userData.groups = [...userData.groups || [], ...selectedGroups].map(group => {
          delete group.internalDatastore;
          delete group.users;
          return group;
        // return {type: 'groups', id: group.id};
        });
        console.log('selectedGroups', selectedGroups);
        console.log('userData.groups', userData.groups);
        console.log('userData', userData);
        return userData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
