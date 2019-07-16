import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CommsCampaign, StorageService, StorageFile } from '@perx/open-services';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { map } from 'rxjs/operators';

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
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'storage', 'files-table');
    this.campaignTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
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

  get columnProperties() {
    return this.campaignTableDisplayProperties;
  }

  private fetchFiles() {
    this.files$ = this.storageServices.getUploadFileList().pipe(
      map(res => res.data),
      map((files: StorageFile[]) => {
        return files.map(file => {
          return {
            id: file.id,
            name: file.attributes.filename,
            urn: file.attributes.urn,
            name_link: `${file.id}`,
            extension: file.attributes.extension,
            createdAt: file.attributes.created_at
          };
        });
      })
    );
  }


}
