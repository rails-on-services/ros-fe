import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CommsCampaign, StorageService, StorageFile } from '@perx/open-services';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map } from 'rxjs/operators';
import { TableActionsManagementComponent } from '@perx/open-ui-components';

@Component({
  selector: 'app-home',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  files$: Observable<any[]>;
  showModal: boolean;
  selection: SelectionModel<CommsCampaign>;

  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];
  @ViewChild(TableActionsManagementComponent) tableActionsManagementComponent: TableActionsManagementComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private storageServices: StorageService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.campaignTableDisplayProperties = this.tableActionsManagementComponent.tableDisplayProperties;
    this.fetchFiles();
  }

  addFile() {
    this.router.navigate(['new-file'], { relativeTo: this.activatedRoute });
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    // this.fetchStorages(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }

  private fetchFiles() {
    this.files$ = this.storageServices.getUploadFileList().pipe(
      map(res => res.data),
      map((files: StorageFile[]) => {
        console.log(files);
        return files.map(file => {
          return {
            id: file.id,
            name: file.attributes.filename,
            urn: file.attributes.urn,
            name_link: `${file.id}`,
            extension: file.attributes.extension,
            creationTime: file.attributes.created_at
          };
        });
      })
    );
  }


}
