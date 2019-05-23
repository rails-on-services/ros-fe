import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, AfterViewInit {
  private eventUnsubscribe$ = new Subject<void>();

  cognitoPools$: Observable<any[]>;
  providers$: Observable<any[]>;
  campaigns$: Observable<any[]>;
  templates$: Observable<any[]>;

  displayProperties: object;
  eventTableDisplayProperties: TableHeaderProperties[] = [];
  templateTableDisplayProperties: TableHeaderProperties[] = [];
  providerTableDisplayProperties: TableHeaderProperties[] = [];
  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  poolTableDisplayProperties: TableHeaderProperties[] = [];
  shownColumns: (string | number | symbol)[];

  eventDetailsGroup: FormGroup;
  isEditable = true;

  @ViewChild('sendAtTimepicker') sendAtTimepicker: NgxMaterialTimepickerComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private cognitoService: CognitoService,
    private formBuilder: FormBuilder,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.displayProperties = displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.eventTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['events-table'];
    // tslint:disable-next-line: no-string-literal
    this.providerTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['providers-table'];
    // tslint:disable-next-line: no-string-literal
    this.templateTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['templates-table'];
    // tslint:disable-next-line: no-string-literal
    this.campaignTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['campaigns-table'];
    // tslint:disable-next-line: no-string-literal
    this.poolTableDisplayProperties = this.displayProperties['essentials']['cognito']['tables']['pools-table'];

  }

  ngOnInit() {
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

  get columnProperties() {
    return this.eventTableDisplayProperties;
  }

  get campaignsColumnProperties() {
    return this.campaignTableDisplayProperties;
  }

  get providerColumnProperties() {
    return this.providerTableDisplayProperties;
  }

  get templateColumnProperties() {
    return this.templateTableDisplayProperties;
  }

  onCognitoPoolSelectionChange(selection: SelectionModel<CognitoPool>) {
    this.formArray.get([1]).get('targetId').setValue(selection.selected[0] ? selection.selected[0].id : '');
    this.formArray.get([1]).get('targetType').setValue('CognitoPool');
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>) {
    this.formArray.get([2]).get('campaign').setValue(selection.selected[0]);
  }

  onProviderSelectionChange(selection: SelectionModel<CommsProvider>) {
    this.formArray.get([3]).get('provider').setValue(selection.selected[0]);
  }


  onTemplateSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.formArray.get([4]).get('template').setValue(selection.selected[0]);
  }

  private fetchCognitoPools() {
    this.cognitoPools$ = this.cognitoService.fetchPools().pipe(
      map(document => {
        const cognitoPools = document.getModels();
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

  private fetchProviders() {
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

  private fetchCampaigns() {
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

  private fetchTemplates() {
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
