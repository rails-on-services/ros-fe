import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CommsService,
  CognitoService,
  CognitoPool,
  CommsProvider,
  CommsCampaign,
  CommsTemplate
} from '@perx/open-services';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { map, takeUntil } from 'rxjs/operators';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  private eventUnsubscribe$: Subject<void> = new Subject<void>();

  cognitoPools$: Observable<any[]>;
  providers$: Observable<any[]>;
  campaigns$: Observable<any[]>;
  templates$: Observable<any[]>;

  displayProperties: object;
  templateTableDisplayProperties: TableHeaderProperties[] = [];
  providerTableDisplayProperties: TableHeaderProperties[] = [];
  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  poolTableDisplayProperties: TableHeaderProperties[] = [];
  shownTemplateColumns: (string | number | symbol)[];
  shownProviderColumns: (string | number | symbol)[];
  shownCampaignColumns: (string | number | symbol)[];
  shownPoolColumns: (string | number | symbol)[];

  eventDetailsGroup: FormGroup;
  isEditable: boolean = true;

  @ViewChild('sendAtTimepicker') sendAtTimepicker: NgxMaterialTimepickerComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private cognitoService: CognitoService,
    private formBuilder: FormBuilder,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
    const tablesAreReady = this.displayProperties &&
      this.displayProperties[`essentials`] &&
      this.displayProperties[`essentials`][`comms`] &&
      this.displayProperties[`essentials`][`comms`][`tables`];
    // tslint:disable-next-line: no-string-literal
    this.providerTableDisplayProperties = tablesAreReady && this.displayProperties[`essentials`][`comms`][`tables`][`providers-table`];
    // tslint:disable-next-line: no-string-literal
    this.templateTableDisplayProperties = tablesAreReady && this.displayProperties[`essentials`][`comms`][`tables`][`templates-table`];
    // tslint:disable-next-line: no-string-literal
    this.campaignTableDisplayProperties = tablesAreReady && this.displayProperties[`essentials`][`comms`][`tables`][`campaigns-table`];
    // tslint:disable-next-line: no-string-literal
    this.poolTableDisplayProperties = tablesAreReady && this.displayProperties[`essentials`][`comms`][`tables`][`pools-table`];

  }

  ngOnInit(): void {
    this.shownTemplateColumns = this.displayPropertiesService.getTableShownColumns(this.templateTableDisplayProperties);
    this.shownProviderColumns = this.displayPropertiesService.getTableShownColumns(this.providerTableDisplayProperties);
    this.shownCampaignColumns = this.displayPropertiesService.getTableShownColumns(this.campaignTableDisplayProperties);
    this.shownPoolColumns = this.displayPropertiesService.getTableShownColumns(this.poolTableDisplayProperties);

    this.eventDetailsGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          eventName: ['', [Validators.required, Validators.maxLength(140)]],
          description: [('')],
          channel: [(''), [Validators.required]],
          sendDate: [(''), [Validators.required]],
          sendTime: [(''), [Validators.required]],
          // eventName: [''],
          // channel: [''],
          // sendDate: [''],
          // sendTime: [''],
        }),
        this.formBuilder.group({
          status: [('')],
          targetId: [('')],
          targetType: [('')],
        }),
        this.formBuilder.group({
          campaign: [('')],
        }),
        this.formBuilder.group({
          provider: [('')],
        }),
        this.formBuilder.group({
          template: [('')],
        }),
      ])
    });

    this.fetchCognitoPools();
    this.fetchCampaigns();
    this.fetchProviders();
    this.fetchTemplates();
  }

  get formArray(): AbstractControl | null {
    return this.eventDetailsGroup.get('formArray');
  }

  hasError(section: number, controlName: string, errorName: string): boolean {
    return this.formArray.get([section]).get(controlName).hasError(errorName);
  }


  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm(): void {

    const dateTime = new Date(this.formArray.get([0]).get('sendDate').value);
    dateTime.setMinutes(this.sendAtTimepicker.selectedMinute.time);
    dateTime.setHours(this.sendAtTimepicker.selectedHour.time);

    const event = {
      name: this.formArray.get([0]).get('eventName').value,
      description: this.formArray.get([0]).get('description').value,
      channel: this.formArray.get([0]).get('channel').value,
      sendAt: dateTime.toString(),
      status: this.formArray.get([1]).get('status').value,
      targetId: this.formArray.get([1]).get('targetId').value,
      targetType: this.formArray.get([1]).get('targetType').value,
      campaignId: this.formArray.get([2]).get('campaign').value.id,
      // providerId: this.formArray.get([3]).get('provider').value.id,
      templateId: this.formArray.get([4]).get('template').value.id,
    };

    this.commsService.createEvent(event).pipe(takeUntil(this.eventUnsubscribe$)).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  get poolColumnProperties(): TableHeaderProperties[] {
    return this.poolTableDisplayProperties;
  }

  get campaignsColumnProperties(): TableHeaderProperties[]  {
    return this.campaignTableDisplayProperties;
  }

  get providerColumnProperties(): TableHeaderProperties[]  {
    return this.providerTableDisplayProperties;
  }

  get templateColumnProperties(): TableHeaderProperties[]  {
    return this.templateTableDisplayProperties;
  }

  onCognitoPoolSelectionChange(selection: SelectionModel<CognitoPool>): void {
    this.formArray.get([1]).get('targetId').setValue(selection.selected[0] ? selection.selected[0].id : '');
    this.formArray.get([1]).get('targetType').setValue('CognitoPool');
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>): void {
    this.formArray.get([2]).get('campaign').setValue(selection.selected[0]);
  }

  onProviderSelectionChange(selection: SelectionModel<CommsProvider>): void {
    this.formArray.get([3]).get('provider').setValue(selection.selected[0]);
  }


  onTemplateSelectionChange(selection: SelectionModel<CommsTemplate>): void {
    this.formArray.get([4]).get('template').setValue(selection.selected[0]);
  }

  private fetchCognitoPools(): void {
    this.cognitoPools$ = this.cognitoService.fetchPools().pipe(
      map(cognitoPools => {
        const pools = cognitoPools.map(cognitoPool => {
          const pool = { id: cognitoPool.id };
          const keys = this.poolTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            pool[key] = cognitoPool[key];
          });

          return pool;
        });

        return pools;
      })
    );
  }

  private fetchProviders(): void {
    this.providers$ = this.commsService.fetchProviders().pipe(
      map(commsProviders => {
        const providers = commsProviders.map(commsProvider => {
          const provider = { id: commsProvider.id };
          const keys = this.providerTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            provider[key] = commsProvider[key];
          });

          return provider;
        });

        return providers;
      })
    );
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

          return campaign;
        });

        return campaigns;
      })
    );
  }

  private fetchTemplates(): void {
    this.templates$ = this.commsService.fetchTemplates().pipe(
      map(commsTemplates => {
        const templates = commsTemplates.map(commsCampaign => {
          const template = { id: commsCampaign.id };
          const keys = this.templateTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            template[key] = commsCampaign[key];
          });

          return template;
        });

        return templates;
      })
    );
  }
}
