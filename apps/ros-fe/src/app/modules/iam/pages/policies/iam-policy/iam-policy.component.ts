import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IamUsersComponent } from '../../iam-users/iam-users.component';
import { Observable } from 'rxjs';
import { IamService, IamPolicy } from '@perx/open-services/dist/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-iam-policy',
  templateUrl: './iam-policy.component.html',
  styleUrls: ['./iam-policy.component.scss']
})
export class IamPolicyComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['policyName', 'remove'];

  @ViewChild(IamUsersComponent) iamUsersComponent: IamUsersComponent;
  private sub: any;
  policy$: Observable<any>;
  policyId: number;

  constructor(
    private iamService: IamService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.policyId = params[`id`];
    });
    this.fetchPolicy();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  detachUsersFromPolicy(selection: SelectionModel<IamPolicy>): void {
    const selectedUsers = selection.selected.map(item => item.id);
    this.iamService.fetchPolicy(this.policyId).pipe(
      map(policy => {
        policy.users = policy.users.filter(item => !selectedUsers.includes(item.id));
        return policy;
      }),
      switchMap(policy => policy.save())
    ).subscribe(
      () => {
        this.iamUsersComponent.clearSelection();
        this.iamUsersComponent.fetchUsers();
      }
    );
  }

  attachUsersToPolicy(): void {
    this.router.navigate(['attach-users'], { relativeTo: this.route });
  }

  private fetchPolicy(): void {
    this.policy$ = this.iamService.fetchPolicy(this.policyId);
  }

}
