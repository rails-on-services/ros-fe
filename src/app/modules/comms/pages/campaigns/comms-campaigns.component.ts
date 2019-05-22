import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CommsService, CommsCampaign } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './comms-campaigns.component.html',
  styleUrls: ['./comms-campaigns.component.scss']
})
export class CommsCampaignsComponent implements OnInit {
  campaigns$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CommsCampaign>;

  displayProperties: object;
  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string|number|symbol)[];

  constructor(
    private commsService: CommsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.campaignTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['campaigns-table'];
  
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.fetchCampaigns();
  }

  addMessage() {
    this.router.navigate(['new-campaign'], { relativeTo: this.activatedRoute });
  }

  removeCampaigns() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(campaign => {
      this.commsService.removeCampaign(campaign.id).subscribe(() => {
        this.fetchCampaigns(true);
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
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.campaignTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.campaignTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.campaignTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['comms']['tables']['campaigns-table'] = this.campaignTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
  }

  private fetchCampaigns(force?: boolean) {
    this.campaigns$ = this.commsService.fetchCampaigns(force).pipe(
      map(commsCampaigns => {
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
    return this.campaignTableDisplayProperties;
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>) {
    this.selection = selection;
  }
}
