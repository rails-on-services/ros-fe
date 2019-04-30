import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { CommsService, CommsEvent } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal,
  ManageColumnModal
} from '@perx/open-ui-components';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  document$: Observable<JsonApiQueryData<CommsEvent>>;
  events$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  selection: SelectionModel<CommsEvent>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CommsEvent.prototype.getColumnProperties());
    this.fetchEvents();
  }

  ngOnDestroy(): void {
    // this.eventsSubsription.unsubscribe();
  }

  addEvent() {
    this.router.navigate(['new-event'], { relativeTo: this.activatedRoute });
  }

  removeEvents() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(event => {
      this.commsService.removeEvent(event.id).subscribe(() => {
        this.selection.deselect(event);
        this.fetchEvents();
      });
    });
  }

  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Events',
        content: 'Are you sure you want to delete the events',
        btnColor: 'warn',
        action: 'Delete'
       }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeEvents();
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
        this.fetchEvents();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CommsEvent.prototype.getColumnProperties(),
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

  private removeDialogComponentFromBody() {
    this.dismissableElement.nativeElement.remove();
  }

  closeButtonClick() {
    this.removeDialogComponentFromBody();
  }

  private fetchEvents() {
    this.events$ = this.commsService.fetchEvents().pipe(
      map(document => {
        const commEvents = document.getModels();
        const events = commEvents.map(commsEvent => {
          const event = { id: commsEvent.id };
          const keys = Object.keys(commsEvent.getColumnProperties());

          keys.forEach(key => {
            event[key] = commsEvent[key];
          });

          return event;
        });

        return events;
      })
    );
  }

  get columnProperties() {
    return CommsEvent.prototype.getColumnProperties();
  }

  onEventsSelectionChange(selection: SelectionModel<CommsEvent>) {
    this.selection = selection;
  }
}
