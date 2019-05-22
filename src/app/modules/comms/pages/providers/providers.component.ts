import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommsService, CommsProvider } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal,
  ManageColumnModal
} from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class CommsProvidersComponent implements OnInit, OnDestroy {
  providers$: Observable<any[]>;
  showModal: boolean;

  selection: SelectionModel<CommsProvider>;

  displayProperties: object;
  providerTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string|number|symbol)[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.providerTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['providers-table'];
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.providerTableDisplayProperties);
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

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        if (this.selection) {
          this.selection.clear();
        }
        this.fetchProviders();
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.providerTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.providerTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.providerTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['comms']['tables']['providers-table'] = this.providerTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
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
          provider['name'] = {
            value: commsProvider.name,
            link: `${ commsProvider.id }`
          };
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
