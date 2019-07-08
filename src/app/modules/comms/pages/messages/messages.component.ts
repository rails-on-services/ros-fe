import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CommsService, CommsMessage } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageColumnModal } from '@perx/open-ui-components';
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

  displayProperties: object;
  messageTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string|number|symbol)[];

  constructor(
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.messageTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['messages-table'];
  
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.messageTableDisplayProperties);
    this.fetchMessages();
  }

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        if (this.selection) {
          this.selection.clear();
        }
        this.fetchMessages(true);
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.messageTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.messageTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.messageTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['comms']['tables']['messages-table'] = this.messageTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
        });
        break;
      case 'help':
        break;
    }
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
