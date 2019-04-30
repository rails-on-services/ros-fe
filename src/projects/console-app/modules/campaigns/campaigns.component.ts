import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  selection: any = null;

  shownColumns: any[] = [];

  columnProperties = {
    name: {
      name: 'Name',
      sortable: true
    },
    status: {
      name: 'Status',
      sortable: false
    },
    start_date: {
      name: 'Start Date',
      sortable: false
    },
    end_date: {
      name: 'End Date',
      sortable: false
    },
    actions: {
      name: 'CHANGE TO TYPE',
      sortable: false
    }
  };

  campaigns = [
    {
      id: '1',
      name: 'Campaign 1',
      status: 'active',
      start_date: new Date('2019-05-20').toLocaleDateString(),
      end_date: new Date('2019-06-20').toLocaleDateString(),
      actions: null
    },
    {
      id: '2',
      name: 'Campaign 2',
      status: 'draft',
      start_date: new Date('2019-06-25').toLocaleDateString(),
      end_date: new Date('2019-08-25').toLocaleDateString(),
      actions: null
    }
  ];

  ngOnInit() {
    this.shownColumns = Object.keys(this.columnProperties);
  }

  onSelectionChange(selection: SelectionModel<any>) {
    this.selection = selection;
  }
}
