import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { CommsService, CommsMessage } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';
import { ConfirmationModal, RenameModal, ManageColumnModal } from '@perx/open-ui-components';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  document$: Observable<JsonApiQueryData<CommsMessage>>;
  testGroupList: Observable<CommsMessage[]>;
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


  removeMessages() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(group => {
      this.commsService.removeMessage(group.id).subscribe(() => {
        this.fetchMessages();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Messages',
        content: 'Are you sure you want to delete the message',
        btnColor: 'warn',
        action: 'Delete'
       }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeMessages();
      }
    });
  }

  editGroupNamePopup() {
    const confirmPopup = this.dialog.open(RenameModal, {
      minWidth: '300px',
      data: { type: 'group' }
    });

    confirmPopup.afterClosed().subscribe(newName => {
      if (newName) {
        if (!this.selection || this.selection.selected.length <= 0) {
          return;
        }
        this.selection.selected.forEach(group => {
          this.commsService.fetchMessage(group.id).subscribe(messageModel => {
            messageModel.name = newName;
            messageModel.save().subscribe();
            this.fetchMessages();
          });


        });
      }
    });
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
      map(document => {
        const commsUsers = document.getModels();
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
