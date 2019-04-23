import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { IamService, IamPolicy } from '@whistler/iam';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';
import { ConfirmationModal } from '../../../../../../../shared/components/modal/confirmation-modal/confirmation-modal.component';
import { ManageColumnModal } from '../../../../../../../shared/components/modal/manage-column-modal/manage-column-modal.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  policies$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<IamPolicy>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(IamPolicy.prototype.getColumnProperties());

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
      width: '30vw',
      data: { type: 'policy' }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removePolicies();
      }
    });
  }

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        if (this.selection) {
          this.selection.clear();
        }
        this.fetchPolicies();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: IamPolicy.prototype.getColumnProperties(),
            selected: this.shownColumns
          }
        }).componentInstance.selectionChange;
        this.shownColumns$.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        break;
      case 'help':
        break;
    }
  }

  private fetchPolicies() {
    this.policies$ = this.iamService.fetchPolicies().pipe(
      map(policy => {
        const iamPolicies = policy.getModels();
        const policies = iamPolicies.map(iamPolicy => {
          const policyDetails = { id: iamPolicy.id };
          const keys = Object.keys(iamPolicy.getColumnProperties());
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
    return IamPolicy.prototype.getColumnProperties();
  }

  onPoliciesSelectionChange(selection: SelectionModel<IamPolicy>) {
    this.selection = selection;
  }
}
