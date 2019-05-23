import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';

export interface ManageColumnDialogData {
  columnProperties: TableHeaderProperties[];
  selected: string[];
}

@Component({
  selector: 'app-manage-column-modal',
  templateUrl: './manage-column-modal.component.html',
  styleUrls: ['./manage-column-modal.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class ManageColumnModal implements OnInit {

  selection = new SelectionModel<string | number | symbol>(true, []);
  selectionChange = new EventEmitter<(string | number | symbol)[]>();

  constructor(
    public dialogRef: MatDialogRef<ManageColumnModal>,
    @Inject(MAT_DIALOG_DATA) public data: ManageColumnDialogData
  ) { }

  ngOnInit() {
    const columnKeys = this.selected ? this.selected : this.columnPropertyKeys;
    columnKeys.forEach(key => {
      this.selection.select(key);
    });
  }

  get columnPropertyKeys() {
    return this.data.columnProperties.map(item => item.key);
  }

  get selected() {
    return this.data.selected;
  }

  onSelectionChange(event: MatCheckboxChange) {
    this.selection.toggle(event.source.name);

    this.selectionChange.emit(this.selection.selected);
  }

}
