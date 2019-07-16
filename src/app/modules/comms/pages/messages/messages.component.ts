import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommsService, CommsMessage } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CommsMessage>;

  messageTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];


  constructor(
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'messages-table');
    this.messageTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.messageTableDisplayProperties);
    this.fetchMessages();
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchMessages(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }


  private fetchMessages(force?: boolean) {
    this.messages$ = this.commsService.fetchMessages(force).pipe(
      map(commsUsers => {
        const users = commsUsers.map(commsUser => {
          const user = { id: commsUser.id };
          const keys = this.messageTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            user[key] = commsUser[key];
          });

          return user;
        });

        return users;
      })
    );
  }

  get columnProperties() {
    return this.messageTableDisplayProperties;
  }

  onMessagesSelectionChange(selection: SelectionModel<CommsMessage>) {
    this.selection = selection;
  }
}
