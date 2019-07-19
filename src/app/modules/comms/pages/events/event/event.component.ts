import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CommsService } from '@perx/open-services';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
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
  templateTableDisplayProperties: TableHeaderProperties[] = [];
  providerTableDisplayProperties: TableHeaderProperties[] = [];
  isProviderEditable: boolean = false;
  isTemplateEditable: boolean = false;

  constructor(
    private commsService: CommsService,
    private route: ActivatedRoute,
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
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params[`id`];
    });
    this.fetchEvent();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private fetchEvent(): void {
    this.event$ = this.commsService.fetchEvent(this.id).pipe(
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

  fetchTemplatesUnderCampaign(campaignId: number): void {
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

  fetchProviders(): void {
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

  switchProvider(): void {
    this.isProviderEditable = true;
  }

  saveProviderChange(): void {
    this.isProviderEditable = false;
  }

  switchTemplate(): void {
    this.isTemplateEditable = true;
  }

  saveTemplateChange(): void {
    const templateTemp$ = this.commsService.fetchTemplate(this.selectedTemplateId);
    const eventTemp$ = this.commsService.fetchEvent(this.id);
    forkJoin(templateTemp$, eventTemp$).pipe(
      map(([template, event]) => {
        event.template = template;
        return event;
      }),
      switchMap(event => event.save())
    ).subscribe(
      () => {
        this.isTemplateEditable = false;
        this.fetchEvent();
      }
    );
  }
  cancelEdit(): void {
    this.isTemplateEditable = false;
    this.isProviderEditable = false;
  }
}

