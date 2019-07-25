import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoUser, CognitoApplication } from '@perx/open-services/dist/open-services';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-apps-to-user',
  templateUrl: './attach-apps-to-user.component.html',
  styleUrls: ['./attach-apps-to-user.component.scss']
})
export class AttachAppsToUserComponent implements OnInit, OnDestroy {
  private sub: any;
  userId: number;
  selection: SelectionModel<CognitoApplication>;
  shownColumns: (string | number | symbol)[];
  user$: Observable<any>;
  allApps$: Observable<any>;
  currentUser$: Observable<any>;
  appTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: CognitoService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
  }

  ngOnInit(): void {
    this.shownColumns = ['name', 'content', 'status', 'createdAt', 'updatedAt'];
    this.sub = this.route.params.subscribe(params => {
      this.userId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'apps-table');
    this.appTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allApps$ = this.iamService.fetchApplications();
    this.currentUser$ = this.iamService.fetchUser(this.userId);
    this.fetchAppsNotInUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getAppInfo(app: CognitoApplication) {
    const appDetails = { id: app.id };
    const keys = this.appTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      appDetails[key] = app[key];
    });

    return appDetails;
  }

  // tslint:disable-next-line: typedef
  getUserInfo(user: CognitoUser, apps: CognitoApplication[]) {
    const userInfo = {
      id: user.id,
      apps: apps.map(app => {
        return this.getAppInfo(app);
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

  private fetchAppsNotInUser(): void {
    this.user$ = forkJoin(this.allApps$, this.currentUser$).pipe(
      map(([appsData, userData]) => {
        const appsInUser = userData.apps || [];
        const apps = appsData.filter(singleApp => {
          if (appsInUser.length <= 0) { return true; }
          const isInUser = appsInUser.some(appInUser => {
            return appInUser.id === singleApp.id;
          });

          return !isInUser;
        });
        const userDetails = this.getUserInfo(userData, apps);

        return userDetails;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.appTableDisplayProperties;
  }

  onAppsSelectionChange(selection: SelectionModel<CognitoApplication>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachAppsToUser(): void {
    const selectedAppIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allApps$, this.currentUser$).pipe(
      map(([appsData, userData]) => {
        const selectedApps = appsData.filter(app => selectedAppIds.includes(app.id));
        userData.apps = [...userData.apps || [], ...selectedApps].map(app => {
          delete app.internalDatastore;
          delete app.users;
          return app;
        });
        return userData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
