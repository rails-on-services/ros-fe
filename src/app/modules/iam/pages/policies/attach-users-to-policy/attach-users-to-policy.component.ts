import { Component, OnInit, OnDestroy } from '@angular/core';
import { IamService, IamUser, IamPolicy } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attach-users-to-policy',
  templateUrl: './attach-users-to-policy.component.html',
  styleUrls: ['./attach-users-to-policy.component.scss']
})
export class AttachUsersToPolicyComponent implements OnInit, OnDestroy {
  private sub: any;
  policyId: number;
  selection: SelectionModel<IamUser>;
  shownColumns: (string | number | symbol)[];
  policy$: Observable<any>;
  allUsers$: Observable<any>;
  currentPolicy$: Observable<any>;
  userTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService) { }

  ngOnInit(): void {
    this.shownColumns = ['username', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.policyId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'users-table');
    this.userTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allUsers$ = this.iamService.fetchUsers();
    this.currentPolicy$ = this.iamService.fetchPolicy(this.policyId);
    this.fetchUsersNotInPolicy();

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
  private getPolicyInfo(policy: IamPolicy, users: IamUser[]) {
    const policyInfo = {
      id: policy.id,
      users: users.map(user => {
        return this.getUserInfo(user);
      }),
      link: `policies/${policy.id}`
    };
    return policyInfo;
  }

  private fetchUsersNotInPolicy(): void {
    this.policy$ = forkJoin(this.allUsers$, this.currentPolicy$).pipe(
      map(([usersData, policyData]) => {
        const usersInPolicy = policyData.users || [];

        const users = usersData.filter(singleUser => {
          if (usersInPolicy.length <= 0) { return true; }
          const isInPolicy = usersInPolicy.some(userInPolicy => {
            return userInPolicy.id === singleUser.id;
          });
          return !isInPolicy;
        });
        const policyDetails = this.getPolicyInfo(policyData, users);

        return policyDetails;
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

  attachUsersToPolicy(): void {
    const selectedUserIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allUsers$, this.currentPolicy$).pipe(
      map(([usersData, policyData]) => {
        const selectedUsers = usersData.filter(user => selectedUserIds.includes(user.id));
        policyData.users = [...policyData.users || [], ...selectedUsers].map(user => {
          delete user.internalDatastore;
          delete user.policies;
          return user;
        });
        return policyData;
      }),
      switchMap(policy => policy.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
