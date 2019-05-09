import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CommsService, CommsCampaign } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './comms-campaigns.component.html',
  styleUrls: ['./comms-campaigns.component.scss']
})
export class CommsCampaignsComponent implements OnInit {
  campaigns$: Observable<any[]>;

  selected: SelectionModel<CommsCampaign>;
  showModal: boolean;
  selection: SelectionModel<CommsCampaign>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private commsService: CommsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CommsCampaign.prototype.getColumnProperties());

    this.fetchCampaigns();
  }

  addMessage() {
    this.router.navigate(['new-campaign'], { relativeTo: this.activatedRoute });
  }

  removeCampaigns() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(group => {
      this.commsService.removeMessage(group.id).subscribe(() => {
        this.fetchCampaigns();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Campaign',
        content: 'Are you sure you want to delete the campaign',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeCampaigns();
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
        this.fetchCampaigns();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CommsCampaign.prototype.getColumnProperties(),
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

  private fetchCampaigns() {
    this.campaigns$ = this.commsService.fetchCampaigns().pipe(
      map(item => {
        const commsCampaigns = item.getModels();
        const campaigns = commsCampaigns.map(commsCampaign => {
          const campaign = { id: commsCampaign.id };
          const keys = Object.keys(commsCampaign.getColumnProperties());

          keys.forEach(key => {
            campaign[key] = commsCampaign[key];
          });
          campaign['ownerType'] = {
            value: commsCampaign.ownerType,
            link: `${commsCampaign.id}`
          };
          return campaign;
        });

        return campaigns;
      })
    );
  }

  get columnProperties() {
    return CommsCampaign.prototype.getColumnProperties();
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>) {
    this.selection = selection;
  }
}
