import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CognitoService, CognitoPool } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-cognito-pools',
  templateUrl: './cognito-pools.component.html',
  styleUrls: ['./cognito-pools.component.scss']
})
export class CognitoPoolsComponent implements OnInit {
  pools$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CognitoPool>;

  displayProperties: object;
  poolTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  constructor(
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.poolTableDisplayProperties = this.displayProperties['essentials']['cognito']['tables']['pools-table'];

  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.poolTableDisplayProperties);
    this.fetchPools();
  }


  removePools() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(pool => {
      this.cognitoService.removePool(pool.id).subscribe(() => {
        this.fetchPools();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Pool',
        content: 'Are you sure you want to delete the pool',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removePools();
      }
    });
  }

  editPoolNamePopup() {
    const confirmPopup = this.dialog.open(RenameModal, {
      minWidth: '300px',
      data: { type: 'pool' }
    });

    confirmPopup.afterClosed().subscribe(newName => {
      if (newName) {
        this.selection.selected.forEach(pool => {
          this.cognitoService.fetchPool(pool.id).subscribe(poolModel => {
            poolModel.name = newName;
            poolModel.save().subscribe(
              () => {
                this.fetchPools();
              }
            );
          });
        });
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
        this.fetchPools();
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.poolTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.poolTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.poolTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['cognito']['tables']['pools-table'] = this.poolTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
  }

  private fetchPools() {
    this.pools$ = this.cognitoService.fetchPools().pipe(
      map(data => {
        const cognitoPools = data.getModels();
        const pools = cognitoPools.map(cognitoPool => {
          const pool = {
            id: cognitoPool.id,
            name: undefined
          };
          const keys = this.poolTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            pool[key] = cognitoPool[key];
          });
          pool.name = {
            value: cognitoPool.name,
            link: `/pools/${cognitoPool.id}`
          };
          return pool;
        });

        return pools;
      })
    );
  }

  get columnProperties() {
    return this.poolTableDisplayProperties;
  }

  onPoolsSelectionChange(selection: SelectionModel<CognitoPool>) {
    this.selection = selection;
  }
}
