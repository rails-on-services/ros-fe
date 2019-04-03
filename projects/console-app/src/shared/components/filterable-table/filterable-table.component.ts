import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss']
})
export class FilterableTableComponent implements OnInit {
  @Input() headers: {key: string, value: string}[];
  @Input() contents: any[];

  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.contents);
    this.dataSource.sort = this.sort;
  }

  get headerKeys() {
    return this.headers.map(column => column.key);
  }

  get headerValues() {
    return this.headers.map(column => column.value);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
