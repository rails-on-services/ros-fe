import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss']
})
export class FilterableTableComponent implements OnInit {
  @Input() contents: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.contents);
  }

}
