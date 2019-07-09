import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IamService, IamPolicy } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  policies$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<IamPolicy>;
  displayProperties: object;
  policyTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.policyTableDisplayProperties = this.displayProperties['essentials']['IAM']['tables']['policies-table'];
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.policyTableDisplayProperties);

    this.fetchPolicies();
  }


  removePolicies() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(policy => {
      this.iamService.removePolicy(policy.id).subscribe(() => {
        this.fetchPolicies();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Policy',
        content: 'Are you sure you want to delete the policy',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removePolicies();
      }
    });
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchPolicies(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }

  private fetchPolicies(force?: boolean) {
    this.policies$ = this.iamService.fetchPolicies(null, force).pipe(
      map(iamPolicies => {
        const policies = iamPolicies.map(iamPolicy => {
          const policyDetails = { id: iamPolicy.id };
          const keys = this.policyTableDisplayProperties.map(item => item.key);
          keys.forEach(key => {
            policyDetails[key] = iamPolicy[key];
          });

          return policyDetails;
        });

        return policies;
      })
    );
  }

  get columnProperties() {
    return this.policyTableDisplayProperties;
  }

  onPoliciesSelectionChange(selection: SelectionModel<IamPolicy>) {
    this.selection = selection;
  }

  attachPolicy() {
    this.router.navigate(['policy-attach', this.selection.selected[0].id], { relativeTo: this.route });
  }
}
