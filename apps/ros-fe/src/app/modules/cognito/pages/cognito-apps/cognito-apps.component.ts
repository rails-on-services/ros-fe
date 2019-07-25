import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoApplication } from '@perx/open-services/dist/open-services';
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
  @ViewChild('dismissible') private dismissibleElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'cognito', 'apps-table');
    this.appTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.appTableDisplayProperties);
    this.fetchApplications();
  }


  addApplication(): void {
    this.router.navigate(['new-app'], { relativeTo: this.activatedRoute });
  }

  removeApplications(): void {
    if (!this.selection || this.selection.selected.length <= 0) {
      return;
    }
    this.selection.selected.forEach(app => {
      this.cognitoService.removeApplication(app.id).subscribe(() => {
        this.fetchApplications();
      });
    });
  }


  showDeleteConfirmationPopup(): void {
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

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchApplications();
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

  private fetchApplications(): void {
    this.apps$ = this.cognitoService.fetchApplications().pipe(
      map(cognitoApplications => {
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

  get columnProperties(): TableHeaderProperties[] {
    return this.appTableDisplayProperties;
  }

  onApplicationsSelectionChange(selection: SelectionModel<CognitoApplication>): void {
    this.selection = selection;
  }

}
