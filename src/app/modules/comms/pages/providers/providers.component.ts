import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommsService, CommsProvider } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal, TableActionsManagementComponent
} from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class CommsProvidersComponent implements OnInit, OnDestroy {
  providers$: Observable<any[]>;
  showModal: boolean;

  selection: SelectionModel<CommsProvider>;

  providerTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];
  @ViewChild(TableActionsManagementComponent) tableActionsManagementComponent: TableActionsManagementComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.providerTableDisplayProperties);
    this.providerTableDisplayProperties = this.tableActionsManagementComponent.tableDisplayProperties;
    this.fetchProviders();
  }

  ngOnDestroy(): void {
    // this.providersSubsription.unsubscribe();
  }

  addProvider() {
    this.router.navigate(['new-provider'], { relativeTo: this.activatedRoute });
  }

  removeProviders() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(provider => {
      this.commsService.removeProvider(provider.id).subscribe(() => {
        this.selection.deselect(provider);
        this.fetchProviders(true);
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Providers',
        content: 'Are you sure you want to delete the providers',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeProviders();
      }
    });
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchProviders(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }


  private fetchProviders(force?: boolean) {
    this.providers$ = this.commsService.fetchProviders(null, force).pipe(
      map(commsProviders => {
        const providers = commsProviders.map(commsProvider => {
          const provider = { id: commsProvider.id };
          const keys = this.providerTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            provider[key] = commsProvider[key];
          });
          provider[`name_link`] = `${commsProvider.id}`;
          return provider;
        });

        return providers;
      })
    );
  }

  get columnProperties() {
    return this.providerTableDisplayProperties;
  }

  onProvidersSelectionChange(selection: SelectionModel<CommsProvider>) {
    this.selection = selection;
  }
}
