import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService, CommsTemplate } from '@perx/open-services';
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
        const data = eventDetails.data;
        const campaign = eventDetails.included.filter(item => item.type === 'campaigns');
        const provider = eventDetails.included.filter(item => item.type === 'provider');
        const template = eventDetails.included.filter(item => item.type === 'template');
        const event = {
          detail: {
            name: data.name,
            urn: data.urn,
            target_type: data.target_type,
            channel: data.channel,
            created_at: data.created_at,
            updated_at: data.updated_at,
            send_at: data.send_at,
          },
          campaign: {
            ...campaign.attributes
          },
          provider: {
            ...provider.attributes
          },
          template: {
            ...template.attributes
          }
        };
        return event;
      })
    );
    this.event$.subscribe((event: { campaign_id: any; }) => {
      this.fetchTemplatesUnderCampaign(event.campaign_id);
    });
  }

  fetchTemplatesUnderCampaign(campaignId: number) {
    this.templates$ = this.commsService.fetchTemplates().pipe(
      map(templatesData => {
        const commTemplates = templatesData.getModels();
        const templates = commTemplates.map(commTemplate => {
          return { id: commTemplate.id, name: commTemplate.name };
        });

        return templates;
      })
    );
  }

  fetchProviders() {
    this.providers$ = this.commsService.fetchProviders().pipe(
      map(providersData => {
        const commProviders = providersData.getModels();
        const providers = commProviders.map(commProvider => {
          return { id: commProvider.id, name: commProvider.name };
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
}

