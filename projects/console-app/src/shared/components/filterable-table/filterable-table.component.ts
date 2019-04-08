import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss']
})
export class FilterableTableComponent implements OnInit {
  @Input() contents: any[];
  @Input() selectable = false;

  @Output() selectionChange = new EventEmitter<SelectionModel<any>>();

  selection = new SelectionModel<any>(true, []);

  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    if (this.contents.length <= 0) {
      return;
    }
    this.dataSource = new MatTableDataSource(this.contents);
    this.dataSource.sort = this.sort;
  }

  get columnProperties() {
    if (this.contents.length > 0) {
      return this.contents[0].getColumnProperties();
    }

    return {};
  }

  get columnPropertyKeys() {
    if (this.contents.length > 0) {
      return Reflect.ownKeys(this.contents[0].getColumnProperties());
    }

    return [];
  }

  get displayedColumns() {
    if (this.selectable) {
      return [
        'select',
        ...this.columnPropertyKeys
      ];
    }
    return [
      ...this.columnPropertyKeys
    ];
  }

  onSelectionChange(row: any) {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection);
  }

  selectAll() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

    this.selectionChange.emit(this.selection);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
