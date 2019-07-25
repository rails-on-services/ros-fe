import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommsService, CommsCampaign } from '@perx/open-services/dist/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModal } from '@perx/open-ui-components';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './comms-campaigns.component.html',
  styleUrls: ['./comms-campaigns.component.scss']
})
export class CommsCampaignsComponent implements OnInit {
  campaigns$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CommsCampaign>;

  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  constructor(
    private commsService: CommsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'campaigns-table');
    this.campaignTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.fetchCampaigns();
  }

  addMessage(): void {
    this.router.navigate(['new-campaign'], { relativeTo: this.activatedRoute });
  }

  removeCampaigns(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(campaign => {
      this.commsService.removeCampaign(campaign.id).subscribe(() => {
        this.fetchCampaigns();
      });
    });
  }

  showDeleteConfirmationPopup(): void {
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

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchCampaigns();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  private fetchCampaigns(): void {
    this.campaigns$ = this.commsService.fetchCampaigns().pipe(
      map(commsCampaigns => {
        const campaigns = commsCampaigns.map(commsCampaign => {
          const campaign = { id: commsCampaign.id };
          const keys = this.campaignTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            campaign[key] = commsCampaign[key];
          });
          campaign[`ownerType_link`] = `${commsCampaign.id}`;

          return campaign;
        });

        return campaigns;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.campaignTableDisplayProperties;
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>): void {
    this.selection = selection;
  }
}
