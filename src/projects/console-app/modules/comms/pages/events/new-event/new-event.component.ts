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
  cognitoPoolSelection: CognitoPool[];
  providerSelection: CommsProvider[];
  campaignSelection: CommsCampaign[];
  templateSelection: CommsTemplate[];
  shownColumns: (string|number|symbol)[];

  eventDetailsGroup: FormGroup;
  isEditable = true;

  @ViewChild('sendAtTimepicker') sendAtTimepicker: NgxMaterialTimepickerComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commsService: CommsService,
              private cognitoService: CognitoService,
              private formBuilder: FormBuilder) {
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
          campaignId: [('')],
        }),
        this.formBuilder.group({
          providerId: [('')],
        }),
        this.formBuilder.group({
          templateId: [('')],
        }),
      ])
    });

    this.fetchCognitoPools();
    this.fetchCampaigns();
    this.fetchProviders();
    this.fetchTemplates();
  }

  get formArray(): AbstractControl|null {
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
      // campaignId: this.formArray.get([2]).get('campaignId').value,
      // providerId: this.formArray.get([3]).get('providerId').value,
      // templateId: this.formArray.get([4]).get('templateId').value,
    };

    this.commsService.createEvent(event).pipe(takeUntil(this.eventUnsubscribe$)).subscribe(() => {
    });
  }

  get columnProperties() {
    return CognitoPool.prototype.getColumnProperties();
  }

  get campaignsColumnProperties() {
    return CommsCampaign.prototype.getColumnProperties();
  }

  get providerColumnProperties() {
    return CommsProvider.prototype.getColumnProperties();
  }

  get templateColumnProperties() {
    return CommsTemplate.prototype.getColumnProperties();
  }

  onCognitoPoolSelectionChange(selection: SelectionModel<CognitoPool>) {
    this.cognitoPoolSelection = selection.selected;
    this.formArray.get([1]).get('targetId').setValue(selection.selected[0].id);
    this.formArray.get([1]).get('targetType').setValue('CognitoPool');
  }

  onProviderSelectionChange(selection: SelectionModel<CommsProvider>) {
    this.providerSelection = selection.selected;
    this.formArray.get([2]).get('providerId').setValue(selection.selected[0].id);
  }

  onCampaignsSelectionChange(selection: SelectionModel<CommsCampaign>) {
    this.campaignSelection = selection.selected;
    this.formArray.get([3]).get('campaignId').setValue(selection.selected[0].id);
  }

  onTemplateSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.templateSelection = selection.selected;
    this.formArray.get([4]).get('templateId').setValue(selection.selected[0].id);
  }

  private fetchCognitoPools() {
    this.cognitoPools$ = this.cognitoService.fetchPools().pipe(
      map(document => {
        const cognitoPools = document.getModels();
        const pools = cognitoPools.map(cognitoPool => {
          const pool = { id: cognitoPool.id };
          const keys = Object.keys(cognitoPool.getColumnProperties());

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
      map(document => {
        const commsProviders = document.getModels();
        const providers = commsProviders.map(commsProvider => {
          const provider = { id: commsProvider.id };
          const keys = Object.keys(commsProvider.getColumnProperties());

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
      map(document => {
        const commsCampaigns = document.getModels();
        const campaigns = commsCampaigns.map(commsCampaign => {
          const campaign = { id: commsCampaign.id };
          const keys = Object.keys(commsCampaign.getColumnProperties());

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
      map(document => {
        const commsTemplates = document.getModels();
        const templates = commsTemplates.map(commsCampaign => {
          const template = { id: commsCampaign.id };
          const keys = Object.keys(commsCampaign.getColumnProperties());

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
