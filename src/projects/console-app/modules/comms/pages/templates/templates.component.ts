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
        this.fetchTemplates();
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

  private fetchTemplates() {
    this.templates$ = this.commsService.fetchTemplates().pipe(
      map(document => {
        const commsTemplates = document.getModels();
        const templates = commsTemplates.map(commsTemplate => {
          const template = { id: commsTemplate.id };
          const keys = Object.keys(commsTemplate.getColumnProperties());

          keys.forEach(key => {
            template[key] = commsTemplate[key];
          });

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
}