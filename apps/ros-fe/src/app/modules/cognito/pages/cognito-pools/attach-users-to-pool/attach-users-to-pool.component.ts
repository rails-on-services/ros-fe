import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CognitoUser, CognitoService, CognitoPool } from '@perx/open-services/dist/open-services';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-users-to-pool',
  templateUrl: './attach-users-to-pool.component.html',
  styleUrls: ['./attach-users-to-pool.component.scss']
})
export class AttachUsersToPoolComponent implements OnInit, OnDestroy {
  private sub: any;
  poolId: number;
  selection: SelectionModel<CognitoUser>;
  shownColumns: (string | number | symbol)[];
  pool$: Observable<any>;
  allUsers$: Observable<any>;
  currentPool$: Observable<any>;
  userTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private displayPropertiesService: DisplayPropertiesService) { }

  ngOnInit(): void {
    this.shownColumns = ['username', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.poolId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allUsers$ = this.cognitoService.fetchUsers();
    this.currentPool$ = this.cognitoService.fetchPool(this.poolId);
    this.fetchUsersNotInPool();

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
  private getPoolInfo(pool: CognitoPool, users: CognitoUser[]) {
    const poolInfo = {
      id: pool.id,
      users: users.map(user => {
        return this.getUserInfo(user);
      }),
      link: `pools/${pool.id}`
    };
    return poolInfo;
  }

  private fetchUsersNotInPool(): void {
    this.pool$ = forkJoin(this.allUsers$, this.currentPool$).pipe(
      map(([usersData, poolData]) => {
        const usersInPool = poolData.users || [];

        const users = usersData.filter(singleUser => {
          if (usersInPool.length <= 0) { return true; }
          const isInPool = usersInPool.some(userInPool => {
            return userInPool.id === singleUser.id;
          });
          return !isInPool;
        });
        const poolDetails = this.getPoolInfo(poolData, users);

        return poolDetails;
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

  attachUsersToPool(): void {
    const selectedUserIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allUsers$, this.currentPool$).pipe(
      map(([usersData, poolData]) => {
        const selectedUsers = usersData.filter(user => selectedUserIds.includes(user.id));
        poolData.users = [...poolData.users || [], ...selectedUsers].map(user => {
          delete user.internalDatastore;
          delete user.pools;
          return user;
        });
        return poolData;
      }),
      switchMap(pool => pool.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
