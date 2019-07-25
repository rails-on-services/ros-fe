import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { CognitoService, IamService, IamPolicy } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-cognito-pool',
  templateUrl: './new-cognito-pool.component.html',
  styleUrls: ['./new-cognito-pool.component.scss']
})
export class NewCognitoPoolComponent implements OnInit {
  policies$: Observable<any[]>;
  selection: SelectionModel<IamPolicy>;
  shownColumns: (string | number | symbol)[];

  poolDetails: FormGroup;
  isEditable: boolean = true;

  createPoolnamePage: boolean;
  reviewPage: boolean;
  policyTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.createPoolnamePage = true;
    this.reviewPage = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'policies-table');
    this.policyTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.poolDetails = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      attachedPolicies: new FormControl([]),
      users: new FormControl({}),
    });
    this.fetchPolicies();
  }

  onPolicySelectionChange(selection: SelectionModel<IamPolicy>): void {
    this.selection = selection;
    this.poolDetails.controls.attachedPolicies.setValue(selection.selected);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.poolDetails.controls[controlName].hasError(errorName);
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm(): void {

    // should only need ids of attached policies and let the backend do the heavy lifiting
    const policies = [];
    if (this.poolDetails.get('attachedPolicies').value) {
      this.poolDetails.get('attachedPolicies').value.forEach((policy) => {
        policies.push(policy.id);
      }
      );
    }

    const pool = {
      name: this.poolDetails.get('name').value,
      attachedPolicies: policies,
      users: this.poolDetails.get('users').value
    };
    this.cognitoService.createPool(pool).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.policyTableDisplayProperties;
  }

  private fetchPolicies(): void {
    this.policies$ = this.iamService.fetchPolicies().pipe(
      map(iamPolicies => {
        const policies = iamPolicies.map(iamPolicy => {
          const policy = { id: iamPolicy.id };
          const keys = this.policyTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            policy[key] = iamPolicy[key];
          });

          return policy;
        });

        return policies;
      })
    );
  }

}
