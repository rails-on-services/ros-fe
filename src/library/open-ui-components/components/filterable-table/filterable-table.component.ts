import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss']
})

export class FilterableTableComponent implements OnInit, AfterViewInit {
  @Input() columnProperties: {};
  @Input() contents: any[];
  @Input() selectable = false;
  @Input() shownColumns: any[];
  @Input() selectType = 'check';
  @Input() radioName: string;
  @Input() hasFilterInput = true;
  @Input() filterInputPlaceholder = 'Find users by user name';

  @Output() selectionChange = new EventEmitter<SelectionModel<any>>();


  hasContent: boolean;

  selection = new SelectionModel<any>(true, []);

  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.hasContent = !!(this.contents.length > 0);
    if (!this.hasContent) {
      return;
    }
    this.dataSource = new MatTableDataSource(this.contents);
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get attributes() {
    if (this.contents && this.contents.length > 0) {
      return Object.keys(this.contents[0]);
    }
    return [];
  }

  get displayedColumns() {
    const columns = this.shownColumns ?
      this.attributes.filter(column => (this.shownColumns.indexOf(column) !== -1)) :
      this.attributes;
    if (this.selectable) {
      return [
        'select',
        ...columns
      ];
    }
    return [
      ...columns
    ];
  }

  onSelectionChange(row: any) {
    if (this.selectType === 'radio') {
      this.selection.clear();
    }

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

  hasLink(element: any) {
    const obj = element as { value: string, link: string };

    if (!obj || !!!obj.link || typeof obj.link === 'function') {
      return false;
    }

    return true;
  }

  hasLinkString(row: any, key: any) {
    return !!row[`${key}_link`];
  }
  getLinkString(row: any, key: any) {
    return row[`${key}_link`];
  }
  isArray(obj: any) {
    return !!obj && obj.constructor === Array;
  }
}
