import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommsService, CommsEvent } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal,
  ManageColumnModal
} from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  @Input() tabMode: string;
  @Input() campaignId: number;

  events$: Observable<any[]>;
  showModal: boolean;

  selection: SelectionModel<CommsEvent>;

  displayProperties: object;
  eventTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string|number|symbol)[];

  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.eventTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['events-table'];
 
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.eventTableDisplayProperties);
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
        this.fetchEvents(true);
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.eventTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.eventTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.eventTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['comms']['tables']['events-table'] = this.eventTableDisplayProperties;
          this.displayPropertiesService.updateCurrentUserDisplayProperties(this.displayProperties);
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

  fetchEvents(force?: boolean) {
    if (this.campaignId) {
      force = true;
    }
    this.events$ = this.commsService.fetchEvents(this.campaignId, force).pipe(
      map(commEvents => {
        const events = commEvents.map(commsEvent => {
          const eventLink = this.tabMode ? `../../events/${commsEvent.id}` : `${commsEvent.id}`;
          const event = { id: commsEvent.id };
          const keys = this.eventTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            event[key] = commsEvent[key];
          });
          event['name_link'] = eventLink;

          return event;
        });

        return events;
      })
    );
  }

  get columnProperties() {
    return this.eventTableDisplayProperties;
  }

  onEventsSelectionChange(selection: SelectionModel<CommsEvent>) {
    this.selection = selection;
  }
}
