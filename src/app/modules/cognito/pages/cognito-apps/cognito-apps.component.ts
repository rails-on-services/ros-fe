import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoApplication } from '@perx/open-services';
import { MatDialog } from '@angular/material';
import { ConfirmationModal } from '@perx/open-ui-components';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

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
  appTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];
  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'apps-table');
    this.appTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
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

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchApplications();
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
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
          const keys = this.appTableDisplayProperties.map(item => item.key);

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
