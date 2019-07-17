import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoService, CognitoPool } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { map, switchMap } from 'rxjs/operators';
import { CognitoUsersComponent } from '../../cognito-users/cognito-users.component';

@Component({
  selector: 'app-cognito-pool',
  templateUrl: './cognito-pool.component.html',
  styleUrls: ['./cognito-pool.component.scss']
})
export class CognitoPoolComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['poolName', 'remove'];

  @ViewChild(CognitoUsersComponent) cognitoUsersComponent: CognitoUsersComponent;
  private sub: any;
  pool$: Observable<any>;
  poolId: number;

  constructor(
    private iamService: CognitoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.poolId = params[`id`];
    });
    this.fetchPool();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  detachUsersFromPool(selection: SelectionModel<CognitoPool>): void {
    const selectedUsers = selection.selected.map(item => item.id);
    this.iamService.fetchPool(this.poolId).pipe(
      map(pool => {
        pool.users = pool.users.filter(item => !selectedUsers.includes(item.id));
        return pool;
      }),
      switchMap(pool => pool.save())
    ).subscribe(
      () => {
        this.cognitoUsersComponent.clearSelection();
        this.cognitoUsersComponent.fetchUsers(true);
      }
    );
  }

  attachUsersToPool(): void {
    this.router.navigate(['attach-pools'], { relativeTo: this.route });
  }

  private fetchPool(): void {
    this.pool$ = this.iamService.fetchPool(this.poolId, true);
  }

}
