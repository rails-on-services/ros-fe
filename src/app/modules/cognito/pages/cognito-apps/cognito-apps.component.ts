import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoApplication, CognitoUser, CognitoPool } from '@perx/open-services';
import { MatDialog, MatButtonToggleChange } from '@angular/material';
import { ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';


@Component({
  selector: 'app-cognito-apps',
  templateUrl: './cognito-apps.component.html',
  styleUrls: ['./cognito-apps.component.scss']
})
export class CognitoAppsComponent implements OnInit {
  apps$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  showModal: boolean;

  selection: SelectionModel<CognitoApplication>;
  displayProperties: object;
  appTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string|number|symbol)[];
  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.appTableDisplayProperties = this.displayProperties['essentials']['cognito']['tables']['apps-table'];
  
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.appTableDisplayProperties);
    this.fetchApplications();
  }


  addApplication() {
    this.router.navigate(['new-app'], { relativeTo: this.activatedRoute });
  }

  removeApplications() {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(app => {
      this.cognitoService.removeApplication(app.id).subscribe(() => {
        this.fetchApplications();
      });
    });
  }


  showDeleteConfirmationPopup() {
    const confirmPopup = this.dialog.open(ConfirmationModal, {
      width: '30vw',
      data: { type: 'app' }
    });

    confirmPopup.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.removeApplications();
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
        this.fetchApplications();
        break;
      case 'settings':
        const columnsDialogRef = this.dialog.open(ManageColumnModal, {
          width: '30rem',
          data: {
            columnProperties: this.appTableDisplayProperties,
            selected: this.shownColumns
          }
        });
        columnsDialogRef.componentInstance.selectionChange.subscribe(columns => {
          this.shownColumns = [
            ...columns
          ];
        });
        columnsDialogRef.afterClosed().subscribe(() => {
          this.appTableDisplayProperties = this.displayPropertiesService
            .setTableShownColumns(this.shownColumns, this.appTableDisplayProperties);
          // tslint:disable-next-line: no-string-literal
          this.displayProperties['essentials']['cognito']['tables']['apps-table'] = this.appTableDisplayProperties;
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

  private fetchApplications() {
    this.apps$ = this.cognitoService.fetchApplications().pipe(
      map(document => {
        const cognitoApplications = document.getModels();
        const apps = cognitoApplications.map(cognitoApplication => {
          const app = { id: cognitoApplication.id };
          const keys = Object.keys(cognitoApplication.getColumnProperties());

          keys.forEach(key => {
            app[key] = cognitoApplication[key];
          });

          return app;
        });

        return apps;
      })
    );
  }

  get columnProperties() {
    return this.appTableDisplayProperties;
  }

  onApplicationsSelectionChange(selection: SelectionModel<CognitoApplication>) {
    this.selection = selection;
  }

}
