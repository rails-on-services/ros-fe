import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IamService, IamPolicy } from '@perx/open-services/dist/open-services';
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
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'IAM', 'policies-table');
    this.policyTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.policyTableDisplayProperties);
    this.fetchPolicies();
  }


  removePolicies(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(policy => {
      this.iamService.removePolicy(policy.id).subscribe(() => {
        this.fetchPolicies();
      });
    });
  }

  showDeleteConfirmationPopup(): void {
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

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchPolicies();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  private fetchPolicies(): void {
    this.policies$ = this.iamService.fetchPolicies(null).pipe(
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

  get columnProperties(): TableHeaderProperties[] {
    return this.policyTableDisplayProperties;
  }

  onPoliciesSelectionChange(selection: SelectionModel<IamPolicy>): void {
    this.selection = selection;
  }

  attachPolicy(): void {
    this.router.navigate(['attach-policies-to-user', this.selection.selected[0].id], { relativeTo: this.route });
  }
}
