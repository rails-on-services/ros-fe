import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CognitoPool, CognitoService, CognitoUser } from '@perx/open-services';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-pools-to-user',
  templateUrl: './attach-pools-to-user.component.html',
  styleUrls: ['./attach-pools-to-user.component.scss']
})
export class AttachPoolToUserComponent implements OnInit, OnDestroy {
  private sub: any;
  userId: number;
  selection: SelectionModel<CognitoPool>;
  shownColumns: (string | number | symbol)[];
  user$: Observable<any>;
  allPools$: Observable<any>;
  currentUser$: Observable<any>;
  poolTableDisplayProperties: TableHeaderProperties[] = [];

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
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'pools-table');
    this.poolTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allPools$ = this.iamService.fetchPools();
    this.currentUser$ = this.iamService.fetchUser(this.userId);
    this.fetchPoolsNotInUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getPoolInfo(pool: CognitoPool) {
    const poolDetails = { id: pool.id };
    const keys = this.poolTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      poolDetails[key] = pool[key];
    });

    return poolDetails;
  }

  // tslint:disable-next-line: typedef
  getUserInfo(user: CognitoUser, pools: CognitoPool[]) {
    const userInfo = {
      id: user.id,
      pools: pools.map(pool => {
        return this.getPoolInfo(pool);
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

  private fetchPoolsNotInUser(): void {
    this.user$ = forkJoin(this.allPools$, this.currentUser$).pipe(
      map(([poolsData, userData]) => {
        const poolsInUser = userData.pools || [];
        const pools = poolsData.filter(singlePool => {
          if (poolsInUser.length <= 0) { return true; }
          const isInUser = poolsInUser.some(poolInUser => {
            return poolInUser.id === singlePool.id;
          });

          return !isInUser;
        });
        const userDetails = this.getUserInfo(userData, pools);

        return userDetails;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.poolTableDisplayProperties;
  }

  onPoolsSelectionChange(selection: SelectionModel<CognitoPool>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachPoolsToUser(): void {
    const selectedPoolIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allPools$, this.currentUser$).pipe(
      map(([poolsData, userData]) => {
        const selectedPools = poolsData.filter(pool => selectedPoolIds.includes(pool.id));
        userData.pools = [...userData.pools || [], ...selectedPools].map(pool => {
          delete pool.internalDatastore;
          delete pool.users;
          return pool;
        });
        return userData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
