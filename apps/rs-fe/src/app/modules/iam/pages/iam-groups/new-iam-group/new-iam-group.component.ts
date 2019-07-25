import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IamService, IamGroup, IamPolicy } from '@perx/open-services/dist/open-services';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';

@Component({
  selector: 'app-new-iam-group',
  templateUrl: './new-iam-group.component.html',
  styleUrls: ['./new-iam-group.component.scss']
})
export class NewIamGroupComponent implements OnInit {
  policies$: Observable<any[]>;
  selection: SelectionModel<IamPolicy>;
  shownColumns: (string | number | symbol)[];

  groupDetailsGroup: FormGroup;
  isEditable: boolean = true;

  createGroupnamePage: boolean;
  reviewPage: boolean;
  policyTableDisplayProperties: TableHeaderProperties[] = [];

  group$: Observable<IamGroup>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.createGroupnamePage = true;
    this.reviewPage = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'policies-table');
    this.policyTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.groupDetailsGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      attachedPolicies: new FormControl([]),
      users: new FormControl({}),
    });
    this.fetchPolicies();
  }

  onPolicySelectionChange(selection: SelectionModel<IamPolicy>): void {
    this.selection = selection;
    this.groupDetailsGroup.controls.attachedPolicies.setValue(selection.selected);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.groupDetailsGroup.controls[controlName].hasError(errorName);
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
    if (this.groupDetailsGroup.get('attachedPolicies').value) {
      this.groupDetailsGroup.get('attachedPolicies').value.forEach((policy) => {
        policies.push(policy.id);
      }
      );
    }

    const group = {
      name: this.groupDetailsGroup.get('name').value,
      attachedPolicies: policies,
      users: this.groupDetailsGroup.get('users').value
    };
    this.iamService.createGroup(group).subscribe( () => {
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
