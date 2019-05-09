import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService, CommsTemplate, CommsProvider } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

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
  private isProviderEditable = false;
  private isTemplateEditable = false;
  selectedTemplate: SelectionModel<CommsTemplate>;
  selectedProvider: SelectionModel<CommsProvider>;


  constructor(
    private commsService: CommsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.fetchEvent();
    this.fetchProviders();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachTemplatesFromCampaign(selection: SelectionModel<CommsTemplate>) {
    this.commsService.fetchCampaign(this.id).subscribe(campaign => {
      campaign.templates = selection.selected;
      campaign.save();
    });
    console.log(selection);
  }

  private fetchEvent() {
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
        this.selectedTemplate = template;
        console.log(this.selectedTemplate);
        return event;
      })
    );
    this.event$.subscribe((event: { campaign_id: any; }) => {
      this.fetchTemplatesUnderCampaign(event.campaign_id);
    });
  }

  fetchTemplatesUnderCampaign(campaignId: number) {
    this.templates$ = this.commsService.fetchTemplates().pipe(
      map(commTemplates => {
        const templates = commTemplates.map(commTemplate => {
          const template = { id: commTemplate.id };
          const keys = Object.keys(commTemplate.getColumnProperties());

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
    this.isTemplateEditable = false;
  }
  cancelEdit() {
    this.isTemplateEditable = false;
    this.isProviderEditable = false;
  }
}

