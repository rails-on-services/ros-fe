import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { CommsService, CommsTemplate } from '@perx/open-services';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ConfirmationModal,
  ManageColumnModal
} from '@perx/open-ui-components';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  @Output() attachTemplatesToCampaign = new EventEmitter();
  @Output() detachTemplatesFromCampaign = new EventEmitter();
  @Input() tabMode: string;
  @Input() campaignId: number;

  document$: Observable<JsonApiQueryData<CommsTemplate>>;
  templates$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  selection: SelectionModel<CommsTemplate>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commsService: CommsService,
    public dialog: MatDialog,
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = Object.keys(CommsTemplate.prototype.getColumnProperties());
    this.fetchTemplates();
  }

  ngOnDestroy(): void {
    // this.templatesSubsription.unsubscribe();
  }

  attachTemplates() {
    this.attachTemplatesToCampaign.emit();
  }

  detachTemplates() {
    this.detachTemplatesFromCampaign.emit(this.selection);
  }

  showDetachConfirmationPopup() {
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
  addTemplate() {
    this.router.navigate(['new-template'], { relativeTo: this.activatedRoute });
  }

  removeTemplates() {
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

  showDeleteConfirmationPopup() {
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

  onOtherActionsChange(event: MatButtonToggleChange) {
    // Toggle off as we only want the look and feel.
    event.source.checked = false;
    switch (event.value) {
      case 'reload':
        if (this.selection) {
          this.selection.clear();
        }
        this.fetchTemplates();
        break;
      case 'settings':
        this.shownColumns$ = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: CommsTemplate.prototype.getColumnProperties(),
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

  fetchTemplates(force?: boolean) {
    force = this.campaignId ? true : false;
    this.templates$ = this.commsService.fetchTemplates(this.campaignId, force).pipe(
      map(commsTemplates => {
        const templates = commsTemplates.map(commsTemplate => {
          const templateLink = this.tabMode ? `../../templates/${commsTemplate.id}` : `${commsTemplate.id}`;
          const template = { id: commsTemplate.id };
          const keys = Object.keys(commsTemplate.getColumnProperties());

          keys.forEach(key => {
            template[key] = commsTemplate[key];
          });
          template['content'] = {
            value: commsTemplate.content,
            link: templateLink
          };
          return template;
        });

        return templates;
      })
    );
  }

  get columnProperties() {
    return CommsTemplate.prototype.getColumnProperties();
  }

  onTemplatesSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.selection = selection;
  }

  clearSelection() {
    this.selection.clear();
  }
}
