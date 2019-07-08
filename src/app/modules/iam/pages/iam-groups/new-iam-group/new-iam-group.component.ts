import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IamService, IamGroup, IamPolicy } from '@perx/open-services';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-new-iam-group',
  templateUrl: './new-iam-group.component.html',
  styleUrls: ['./new-iam-group.component.scss']
})
export class NewIamGroupComponent implements OnInit, AfterViewInit {
  policies$: Observable<any[]>;
  selection: IamPolicy[];
  shownColumns: (string | number | symbol)[];

  groupDetailsGroup: FormGroup;
  isEditable = true;

  createGroupnamePage: boolean;
  reviewPage: boolean;
  displayProperties: object;
  policyTableDisplayProperties: TableHeaderProperties[] = [];

  group$: Observable<IamGroup>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService) {
    this.createGroupnamePage = true;
    this.reviewPage = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.policyTableDisplayProperties = this.displayProperties['essentials']['IAM']['tables']['policies-table'];
 
  }

  ngOnInit() {
    this.groupDetailsGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      attachedPolicies: new FormControl([]),
      users: new FormControl({}),
    });

    this.fetchPolicies();
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }


  onPolicySelectionChange(selection: SelectionModel<IamPolicy>) {
    this.selection = selection.selected;
    this.groupDetailsGroup.controls.attachedPolicies.setValue(selection.selected);
  }

  hasError(controlName: string, errorName: string) {
    return this.groupDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {

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
    this.group$ = this.iamService.createGroup(group);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get columnProperties() {
    return this.policyTableDisplayProperties;
  }

  private fetchPolicies() {
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
