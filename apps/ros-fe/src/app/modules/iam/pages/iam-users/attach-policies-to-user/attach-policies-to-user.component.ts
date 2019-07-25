import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IamPolicy, IamService, IamUser } from '@perx/open-services/dist/open-services';
import { Observable, forkJoin } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-attach-policies-to-user',
  templateUrl: './attach-policies-to-user.component.html',
  styleUrls: ['./attach-policies-to-user.component.scss']
})
export class AttachPoliciesToUserComponent implements OnInit, OnDestroy {
  private sub: any;
  userId: number;
  selection: SelectionModel<IamPolicy>;
  shownColumns: (string | number | symbol)[];
  user$: Observable<any>;
  allPolicies$: Observable<any>;
  currentUser$: Observable<any>;
  policyTableDisplayProperties: TableHeaderProperties[] = [];

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
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'policies-table');
    this.policyTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.allPolicies$ = this.iamService.fetchPolicies();
    this.currentUser$ = this.iamService.fetchUser(this.userId);
    this.fetchPoliciesNotInUser();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getPolicyInfo(policy: IamPolicy) {
    const policyDetails = { id: policy.id };
    const keys = this.policyTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      policyDetails[key] = policy[key];
    });

    return policyDetails;
  }

  // tslint:disable-next-line: typedef
  getUserInfo(user: IamUser, policies: IamPolicy[]) {
    const userInfo = {
      id: user.id,
      policies: policies.map(policy => {
        return this.getPolicyInfo(policy);
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

  private fetchPoliciesNotInUser(): void {
    this.user$ = forkJoin(this.allPolicies$, this.currentUser$).pipe(
      map(([policiesData, userData]) => {
        const policiesInUser = userData.policies || [];
        const policies = policiesData.filter(singlePolicy => {
          if (policiesInUser.length <= 0) { return true; }
          const isInUser = policiesInUser.some(policyInUser => {
            return policyInUser.id === singlePolicy.id;
          });

          return !isInUser;
        });
        const userDetails = this.getUserInfo(userData, policies);

        return userDetails;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.policyTableDisplayProperties;
  }

  onPoliciesSelectionChange(selection: SelectionModel<IamPolicy>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachPoliciesToUser(): void {
    const selectedPolicyIds = this.selection.selected.map(item => item.id);


    forkJoin(this.allPolicies$, this.currentUser$).pipe(
      map(([policiesData, userData]) => {
        const selectedPolicies = policiesData.filter(policy => selectedPolicyIds.includes(policy.id));
        userData.policies = [...userData.policies || [], ...selectedPolicies].map(policy => {
          delete policy.internalDatastore;
          delete policy.users;
          return policy;
        });
        return userData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
