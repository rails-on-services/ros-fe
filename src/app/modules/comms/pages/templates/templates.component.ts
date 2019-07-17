import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { CommsService, CommsTemplate } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal
} from '@perx/open-ui-components';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  @Output() attachTemplatesToCampaign: EventEmitter<any> = new EventEmitter();
  @Output() detachTemplatesFromCampaign: EventEmitter<any> = new EventEmitter();
  @Input() tabMode: string;
  @Input() campaignId: number;

  document$: Observable<JsonApiQueryData<CommsTemplate>>;
  templates$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  selection: SelectionModel<CommsTemplate>;

  templateTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

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
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'templates-table');
    this.templateTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.templateTableDisplayProperties);
    this.fetchTemplates();
  }

  ngOnDestroy(): void {
    // this.templatesSubsription.unsubscribe();
  }

  attachTemplates(): void {
    this.attachTemplatesToCampaign.emit();
  }

  detachTemplates(): void {
    this.detachTemplatesFromCampaign.emit(this.selection);
  }

  showDetachConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Detach Events',
        content: 'Are you sure you want to detach the events from campaign',
        btnColor: 'warn',
        action: 'Detach'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDetach => {
      if (shouldDetach) {
        this.detachTemplates();
      }
    });
  }
  addTemplate(): void {
    this.router.navigate(['new-template'], { relativeTo: this.activatedRoute });
  }

  removeTemplates(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(template => {
      this.commsService.removeTemplate(template.id).subscribe(() => {
        this.selection.deselect(template);
        this.fetchTemplates(true);
      });
    });
  }

  showDeleteConfirmationPopup(): void {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      minWidth: '300px',
      data: {
        header: 'Deleting Templates',
        content: 'Are you sure you want to delete the templates',
        btnColor: 'warn',
        action: 'Delete'
      }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeTemplates();
      }
    });
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchTemplates(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }


  fetchTemplates(force?: boolean): void {
    if (this.campaignId) {
      force = true;
    }
    this.templates$ = this.commsService.fetchTemplates(this.campaignId, force).pipe(
      map(commsTemplates => {
        const templates = commsTemplates.map(commsTemplate => {
          const templateLink = this.tabMode ? `../../templates/${commsTemplate.id}` : `${commsTemplate.id}`;
          const template = { id: commsTemplate.id };
          const keys = this.templateTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            template[key] = commsTemplate[key];
          });
          template[`content_link`] = templateLink;
          return template;
        });

        return templates;
      })
    );
  }

  get columnProperties(): TableHeaderProperties[] {
    return this.templateTableDisplayProperties;
  }

  onTemplatesSelectionChange(selection: SelectionModel<CommsTemplate>): void {
    this.selection = selection;
  }

  clearSelection(): void {
    this.selection.clear();
  }
}
