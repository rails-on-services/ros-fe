import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CognitoService, CognitoPool } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';

@Component({
  selector: 'app-cognito-pools',
  templateUrl: './cognito-pools.component.html',
  styleUrls: ['./cognito-pools.component.scss']
})
export class CognitoPoolsComponent implements OnInit {
  pools$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CognitoPool>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CognitoPool.prototype.getColumnProperties());

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
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CognitoPool.prototype.getColumnProperties(),
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

  private fetchPools() {
    this.pools$ = this.cognitoService.fetchPools().pipe(
      map(data => {
        const cognitoPools = data.getModels();
        const pools = cognitoPools.map(cognitoPool => {
          const pool = {
            id: cognitoPool.id,
            name: undefined
          };
          const keys = Object.keys(cognitoPool.getColumnProperties());

          keys.forEach(key => {
            pool[key] = cognitoPool[key];
          });
          pool.name = {
            value: cognitoPool.name,
            link: `/pools/${ cognitoPool.id }`
          };
          return pool;
        });

        return pools;
      })
    );
  }

  get columnProperties() {
    return CognitoPool.prototype.getColumnProperties();
  }

  onPoolsSelectionChange(selection: SelectionModel<CognitoPool>) {
    this.selection = selection;
  }
}
