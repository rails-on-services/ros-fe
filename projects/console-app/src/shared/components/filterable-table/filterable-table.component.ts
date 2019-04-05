import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss']
})
export class FilterableTableComponent implements OnInit {
  @Input() contents: any[];

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
