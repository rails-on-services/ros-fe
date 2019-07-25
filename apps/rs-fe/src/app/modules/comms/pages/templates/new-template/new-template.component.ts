import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommsCampaign, CommsService } from '@perx/open-services/dist/open-services';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {
  campaigns$: Observable<any[]>;
  campaignSelection: SelectionModel<CommsCampaign>;
  shownColumns: (string | number | symbol)[];
  campaignTableDisplayProperties: TableHeaderProperties[] = [];

  templateDetailsGroup: FormGroup;
  isEditable: boolean = true;

  private templateUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private formBuilder: FormBuilder,
    private displayPropertiesService: DisplayPropertiesService) {}

  ngOnInit(): void {
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'templates-table');
    this.campaignTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.shownColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.templateDetailsGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          templateName: ['', [Validators.required, Validators.maxLength(140)]],
          description: [('')],
          content: [''],
          status: ['']
        }),
        this.formBuilder.group({
          campaigns: [''],
        }),
      ])
    });
    this.fetchCampaigns();
  }

  get formArray(): AbstractControl | null {
    return this.templateDetailsGroup.get('formArray');
  }

  hasError(section: number, controlName: string, errorName: string): boolean {
    return this.formArray.get([section]).get(controlName).hasError(errorName);
  }


  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm(): void {
    const template = {
      name: this.formArray.get([0]).get('templateName').value,
      description: this.formArray.get([0]).get('description').value,
      content: this.formArray.get([0]).get('content').value,
      status: this.formArray.get([0]).get('status').value,
      campaigns: this.formArray.get([1]).get('campaigns').value.map(item => item.id),
    };

    this.commsService.createTemplate(template).pipe(takeUntil(this.templateUnsubscribe$)).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  reloadTable(): void {
    if (this.campaignSelection) {
      this.campaignSelection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  private fetchCampaigns(): void {
    this.campaigns$ = this.commsService.fetchCampaigns().pipe(
      map(commsCampaigns => {
        const campaigns = commsCampaigns.map(commsCampaign => {
          const campaign = { id: commsCampaign.id };
          const keys = this.campaignTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            campaign[key] = commsCampaign[key];
          });
          campaign[`ownerType_link`] = `${commsCampaign.id}`;
          return campaign;
        });

        return campaigns;
      })
    );
  }

  get campaignsColumnProperties(): TableHeaderProperties[] {
    return this.campaignTableDisplayProperties;
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>): void {
    this.campaignSelection = selection;
    this.formArray.get([1]).get('campaigns').setValue([...selection.selected]);
  }
}
