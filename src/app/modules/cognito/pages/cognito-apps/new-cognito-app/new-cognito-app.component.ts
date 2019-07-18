import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IamPolicy, CognitoService } from '@perx/open-services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-new-cognito-app',
  templateUrl: './new-cognito-app.component.html',
  styleUrls: ['./new-cognito-app.component.scss']
})
export class NewCognitoAppComponent implements OnInit {
  selection: SelectionModel<IamPolicy>;
  shownColumns: (string | number | symbol)[];

  appDetails: FormGroup;
  isEditable: boolean = true;

  createAppnamePage: boolean;
  reviewPage: boolean;
  policyTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.createAppnamePage = true;
    this.reviewPage = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'policies-table');
    this.policyTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.appDetails = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      attachedPolicies: new FormControl([]),
      users: new FormControl({}),
    });
  }

  onPolicySelectionChange(selection: SelectionModel<IamPolicy>): void {
    this.selection = selection;
    this.appDetails.controls.attachedPolicies.setValue(selection.selected);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.appDetails.controls[controlName].hasError(errorName);
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
    if (this.appDetails.get('attachedPolicies').value) {
      this.appDetails.get('attachedPolicies').value.forEach((policy) => {
        policies.push(policy.id);
      }
      );
    }

    const app = {
      name: this.appDetails.get('name').value
    };
    this.cognitoService.createApplication(app).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.policyTableDisplayProperties;
  }

}
