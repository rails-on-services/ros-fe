import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommsCampaign, CommsService } from '@perx/open-services';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { TableActionsManagementComponent } from '@perx/open-ui-components';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit, AfterViewInit {
  campaigns$: Observable<any[]>;
  campaignSelection: SelectionModel<CommsCampaign>;
  shownColumns: (string | number | symbol)[];
  campaignTableDisplayProperties: TableHeaderProperties[] = [];

  templateDetailsGroup: FormGroup;
  isEditable = true;
  @ViewChild(TableActionsManagementComponent) tableActionsManagementComponent: TableActionsManagementComponent;

  private templateUnsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private formBuilder: FormBuilder,
    private displayPropertiesService: DisplayPropertiesService) {

  }

  ngOnInit() {
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
    this.campaignTableDisplayProperties = this.tableActionsManagementComponent.tableDisplayProperties;
    this.fetchCampaigns();
  }

  get formArray(): AbstractControl | null {
    return this.templateDetailsGroup.get('formArray');
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  hasError(section: number, controlName: string, errorName: string) {
    return this.formArray.get([section]).get(controlName).hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {
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

  reloadTable() {
    if (this.campaignSelection) {
      this.campaignSelection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []) {
    this.shownColumns = shownColumns;
  }

  private fetchCampaigns(force?: boolean) {
    this.campaigns$ = this.commsService.fetchCampaigns(force).pipe(
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

  get campaignsColumnProperties() {
    return this.campaignTableDisplayProperties;
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>) {
    this.campaignSelection = selection;
    this.formArray.get([1]).get('campaigns').setValue([...selection.selected]);
  }
}
