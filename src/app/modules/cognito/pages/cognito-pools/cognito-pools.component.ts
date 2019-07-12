import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CognitoService, CognitoPool } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ConfirmationModal, RenameModal } from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

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
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
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
    let newName = '';
    const confirmPopup = this.dialog.open(RenameModal, {
      minWidth: '300px',
      data: { type: 'pool' }
    });

    confirmPopup.afterClosed().pipe(
      tap(nameTemp => newName = nameTemp),
      switchMap(nameTemp => {
        if (nameTemp) {
          return from(this.selection.selected);
        } else {
          return from([]);
        }
      }),
      switchMap(pool => this.cognitoService.fetchPool(pool.id)),
      map(poolModel => { poolModel.name = newName; return poolModel; }),
      switchMap(poolModel => poolModel.save())
    ).subscribe(
      () => {
        this.fetchPools();
      }
    );
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchPools();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
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
          pool[`name_link`] = `/pools/${cognitoPool.id}`;

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
