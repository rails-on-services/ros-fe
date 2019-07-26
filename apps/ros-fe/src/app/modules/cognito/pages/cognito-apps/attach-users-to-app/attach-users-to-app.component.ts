import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CognitoUser, CognitoService, CognitoApplication } from '@perx/open-services';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-users-to-app',
  templateUrl: './attach-users-to-app.component.html',
  styleUrls: ['./attach-users-to-app.component.scss']
})
export class AttachUsersToAppComponent implements OnInit, OnDestroy {
  private sub: any;
  appId: number;
  selection: SelectionModel<CognitoUser>;
  shownColumns: (string | number | symbol)[];
  app$: Observable<any>;
  allUsers$: Observable<any>;
  currentApp$: Observable<any>;
  userTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private displayPropertiesService: DisplayPropertiesService) { }

  ngOnInit(): void {
    this.shownColumns = ['username', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.appId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allUsers$ = this.cognitoService.fetchUsers();
    this.currentApp$ = this.cognitoService.fetchApplication(this.appId);
    this.fetchUsersNotInApp();

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  private getUserInfo(user: CognitoUser) {
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
  private getAppInfo(app: CognitoApplication, users: CognitoUser[]) {
    const appInfo = {
      id: app.id,
      users: users.map(user => {
        return this.getUserInfo(user);
      }),
      link: `apps/${app.id}`
    };
    return appInfo;
  }

  private fetchUsersNotInApp(): void {
    this.app$ = forkJoin(this.allUsers$, this.currentApp$).pipe(
      map(([usersData, appData]) => {
        const usersInApp = appData.users || [];

        const users = usersData.filter(singleUser => {
          if (usersInApp.length <= 0) { return true; }
          const isInApp = usersInApp.some(userInApp => {
            return userInApp.id === singleUser.id;
          });
          return !isInApp;
        });
        const appDetails = this.getAppInfo(appData, users);

        return appDetails;
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

  onUsersSelectionChange(selection: SelectionModel<CognitoUser>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachUsersToApp(): void {
    const selectedUserIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allUsers$, this.currentApp$).pipe(
      map(([usersData, appData]) => {
        const selectedUsers = usersData.filter(user => selectedUserIds.includes(user.id));
        appData.users = [...appData.users || [], ...selectedUsers].map(user => {
          delete user.internalDatastore;
          delete user.apps;
          return user;
        });
        return appData;
      }),
      switchMap(app => app.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
