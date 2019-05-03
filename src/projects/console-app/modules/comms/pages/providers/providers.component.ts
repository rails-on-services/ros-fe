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

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class CommsProvidersComponent implements OnInit, OnDestroy {
  providers$: Observable<any[]>;
  showModal: boolean;

  selection: SelectionModel<CommsProvider>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CommsProvider.prototype.getColumnProperties());
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
        this.fetchProviders();
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
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CommsProvider.prototype.getColumnProperties(),
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

  private fetchProviders() {
    this.providers$ = this.commsService.fetchProviders().pipe(
      map(document => {
        const commsProviders = document.getModels();
        const providers = commsProviders.map(commsProvider => {
          const provider = { id: commsProvider.id };
          const keys = Object.keys(commsProvider.getColumnProperties());

          keys.forEach(key => {
            provider[key] = commsProvider[key];
          });

          return provider;
        });

        return providers;
      })
    );
  }

  get columnProperties() {
    return CommsProvider.prototype.getColumnProperties();
  }

  onProvidersSelectionChange(selection: SelectionModel<CommsProvider>) {
    this.selection = selection;
  }
}
