import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { ManageColumnModal } from '../modal/manage-column-modal/manage-column-modal.component';

@Component({
  selector: 'app-table-actions-management',
  templateUrl: './table-actions-management.component.html',
  styleUrls: ['./table-actions-management.component.scss']
})
export class TableActionsManagementComponent implements OnInit {
  @Output() reloadTableEmit = new EventEmitter();
  @Output() changeTableHeaderSettingEmit = new EventEmitter();
  @Input() tablePlatform: string;
  @Input() tableModule: string;
  @Input() tableName: string;
  @Input() shownColumns: (string | number | symbol)[] = [];

  displayProperties: object;
  tableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
  }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.tableDisplayProperties = this.displayProperties[this.tablePlatform][this.tableModule]['tables'][this.tableName];
  }

  reloadTable() {
    this.reloadTableEmit.emit();
  }

  changeTableHeaderSetting() {
    this.changeTableHeaderSettingEmit.emit(this.shownColumns);
  }

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        this.reloadTable();
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.tableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
          this.changeTableHeaderSetting();
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.tableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.tableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties[this.tablePlatform][this.tableModule]['tables'][this.tableName] = this.tableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
  }

}
