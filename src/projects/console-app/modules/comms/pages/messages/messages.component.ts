import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CommsService, CommsMessage } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageColumnModal } from '@perx/open-ui-components';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<any[]>;

  showModal: boolean;
  selection: SelectionModel<CommsMessage>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private commsService: CommsService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CommsMessage.prototype.getColumnProperties());

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
        this.fetchMessages();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CommsMessage.prototype.getColumnProperties(),
            selected: this.shownColumns
          }
        }).componentInstance.selectionChange;
        this.shownColumns$.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        break;
      case 'help':
        break;
    }
  }

  private fetchMessages() {
    this.messages$ = this.commsService.fetchMessages().pipe(
      map(commsUsers => {
        const users = commsUsers.map(commsUser => {
          const user = { id: commsUser.id };
          const keys = Object.keys(commsUser.getColumnProperties());

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
    return CommsMessage.prototype.getColumnProperties();
  }

  onMessagesSelectionChange(selection: SelectionModel<CommsMessage>) {
    this.selection = selection;
  }
}
