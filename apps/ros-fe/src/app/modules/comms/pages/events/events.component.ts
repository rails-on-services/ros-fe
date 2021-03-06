import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  Input
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommsService, CommsEvent } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal
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

  eventTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  @ViewChild('dismissible') private dismissibleElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'events-table');
    this.eventTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.eventTableDisplayProperties);
    this.fetchEvents();
  }

  ngOnDestroy(): void {
    // this.eventsSubsription.unsubscribe();
  }

  addEvent(): void {
    this.router.navigate(['new-event'], { relativeTo: this.activatedRoute });
  }

  removeEvents(): void {
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

  showDeleteConfirmationPopup(): void {
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

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchEvents();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }


  private removeDialogComponentFromBody(): void {
    this.dismissibleElement.nativeElement.remove();
  }

  closeButtonClick(): void {
    this.removeDialogComponentFromBody();
  }

  fetchEvents(): void {
    this.events$ = this.commsService.fetchEvents(this.campaignId).pipe(
      map(commEvents => {
        const events = commEvents.map(commsEvent => {
          const eventLink = this.tabMode ? `../../events/${commsEvent.id}` : `${commsEvent.id}`;
          const event = { id: commsEvent.id };
          const keys = this.eventTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            event[key] = commsEvent[key];
          });
          event[`name_link`] = eventLink;

          return event;
        });

        return events;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.eventTableDisplayProperties;
  }

  onEventsSelectionChange(selection: SelectionModel<CommsEvent>): void {
    this.selection = selection;
  }
}
