import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService, CommsTemplate } from '@perx/open-services';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  private sub: any;
  event$: Observable<any>;
  templates$: Observable<any>;
  providers$: Observable<any>;
  id: number;
  selectedTemplateId: number | string;
  selectedProviderId: number | string;
  displayProperties: object;
  eventTableDisplayProperties: TableHeaderProperties[] = [];
  templateTableDisplayProperties: TableHeaderProperties[] = [];
  providerTableDisplayProperties: TableHeaderProperties[] = [];
  isProviderEditable = false;
  isTemplateEditable = false;

  constructor(
    private commsService: CommsService,
    private route: ActivatedRoute,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    this.displayProperties = this.displayPropertiesService.getUserDisplayProperties();
    // tslint:disable-next-line: no-string-literal
    this.eventTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['events-table'];
    // tslint:disable-next-line: no-string-literal
    this.providerTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['providers-table'];
    // tslint:disable-next-line: no-string-literal
    this.templateTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['templates-table'];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.fetchEvent();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private fetchEvent(force?: boolean) {
    this.event$ = this.commsService.fetchEvent(this.id, force).pipe(
      map(eventDetails => {
        const campaign = eventDetails.lastSyncModels.filter(item => item.type === 'campaigns')[0];
        // const provider = eventDetailsData.lastSyncModels.filter(item => item.type === 'providers')[0];
        const template = eventDetails.lastSyncModels.filter(item => item.type === 'templates')[0];
        const event = {
          detail: {
            name: eventDetails.name,
            urn: eventDetails.urn,
            target_type: eventDetails.targetType,
            channel: eventDetails.channel,
            created_at: eventDetails.createdAt,
            updated_at: eventDetails.updatedAt,
            send_at: eventDetails.sendAt,
            status: eventDetails.status
          },
          campaign: {
            ...campaign.attributes
          },
          // provider: {
          //   ...provider.attributes
          // },
          template: {
            ...template.attributes
          }
        };
        // this.selectedProvider = provider;
        this.selectedTemplateId = template.id;
        return event;
      })
    );
    this.event$.subscribe((event: { campaign_id: any; }) => {
      this.fetchTemplatesUnderCampaign(event.campaign_id);
    });
  }

  fetchTemplatesUnderCampaign(campaignId: number) {
    this.templates$ = this.commsService.fetchTemplates(campaignId).pipe(
      map(commTemplates => {
        const templates = commTemplates.map(commTemplate => {
          const template = { id: commTemplate.id };
          const keys = this.templateTableDisplayProperties.map(item => item.key);

          keys.forEach(key => {
            template[key] = commTemplate[key];
          });
          return template;
        });
        return templates;
      })
    );
  }

  fetchProviders() {
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

  switchProvider() {
    this.isProviderEditable = true;
  }

  saveProviderChange() {
    this.isProviderEditable = false;
  }

  switchTemplate() {
    this.isTemplateEditable = true;
  }

  saveTemplateChange() {
    let selectedTemplate: CommsTemplate = null;
    this.commsService.fetchTemplate(this.selectedTemplateId)
      .subscribe(template => {
        selectedTemplate = template;
      });
    this.commsService.fetchEvent(this.id).subscribe(event => {
      event.template = selectedTemplate;
      event.save().subscribe(
        () => {
          this.isTemplateEditable = false;
          this.fetchEvent(true);
        }
      );
    });
  }
  cancelEdit() {
    this.isTemplateEditable = false;
    this.isProviderEditable = false;
  }
}

