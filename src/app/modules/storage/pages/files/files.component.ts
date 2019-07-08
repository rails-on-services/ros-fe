import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { CommsCampaign } from '@perx/open-services';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  files$: Observable<any[]>;
  showModal: boolean;
  selection: SelectionModel<CommsCampaign>;

  displayProperties: object;
  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  constructor(
    private storageServices: StorageServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.showModal = false;
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.campaignTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['campaigns-table'];
  }

  ngOnInit() {
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.fetchStorages();
  }

  addFile() {
    this.router.navigate(['new-storage'], { relativeTo: this.activatedRoute });
  }

  reloadTable() {
    if (this.selection) {
      this.selection.clear();
    }
    this.fetchStorages(true);
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }

  private fetchStorages(force = false) {
    this.files$ = this.storageServices.fetchUsers(force).pipe(
      map((users: StorageFile[]) => {
        console.log(users);
        return users.map(user => {
          return {
            id: user.id,
            username: user.username,
            username_link: `${user.id}`,
            urn: user.urn,
            apiAccess: user.apiAccess,
            consoleAccess: user.consoleAccess
          };
        });
      })
    );
  }


}
