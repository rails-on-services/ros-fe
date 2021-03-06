import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CommsMessage } from './models/message.model';
import { CommsDatastore } from './comms-datastore.service';
import { CommsEvent } from './models/event.model';
import { CommsTemplate } from './models/template.model';
import { CommsCampaign } from './models/campaign.model';
import { CommsProvider } from './models/provider.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  constructor(private datastore: CommsDatastore) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic ADHMJOIIMTOLFCFHFGMN:pEkCcZwX7aYD5_APSqNv3u4XfuSJoi8UhwTKsnzFzBry9HlRG9Zedw'

    });
  }

  public fetchMessages(): Observable<CommsMessage[]> {
    // if (!force) {
    //   const messages = this.datastore.peekAll(CommsMessage);
    //   if (messages && messages.length > 0) {
    //     return of(messages);
    //   }
    // }

    return this.datastore.findAll(
      CommsMessage,
      {
        page: { size: 10, number: 1 },
        // include: 'event'
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchMessage(id: number | string): Observable<CommsMessage> {
    // if (!force) {
    //   const message = this.datastore.peekRecord(CommsMessage, `${id}`);
    //   if (message) {
    //     return of(message);
    //   }
    // }

    return this.datastore.findRecord(CommsMessage, `${id}`);
  }

  public createMessage(message: {
    name: string; channel: string; from: string; to: string,
    ownerType: string
  }): Observable<CommsMessage> {
    const newMessage = this.datastore.createRecord(
      CommsMessage,
      {
        ...message
      }
    );

    return newMessage.save();
  }

  public removeMessage(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CommsMessage,
      `${id}`
    );
  }

  public fetchTemplates(campaignId?: number | string): Observable<CommsTemplate[]> {
    // if (!force) {
    //   const templates = this.datastore.peekAll(CommsTemplate);
    //   if (templates && templates.length > 0) {
    //     return of(templates);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 },
      include: 'campaign',
    };
    if (campaignId) {
      params[`filter`] = { campaign_id: campaignId };
    }
    return this.datastore.findAll(
      CommsTemplate,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchTemplate(id: number | string): Observable<CommsTemplate> {
    // if (!force) {
    //   const template = this.datastore.peekRecord(CommsTemplate, `${id}`);
    //   if (template) {
    //     return of(template);
    //   }
    // }

    return this.datastore.findRecord(CommsTemplate, `${id}`, { include: 'campaign' });
  }

  public createTemplate(template: {
    name: string,
    description: string,
    content: string,
    status: string,
    campaigns: string[]
  }): Observable<any> {
    // TODO: currently API only accept to attach to one campaign each time
    const selectedCampaigns: CommsCampaign[] = [];
    this.fetchCampaigns()
      .subscribe(campaignsResult => {
        campaignsResult.forEach(campaign => {
          if (template.campaigns.includes(campaign.id)) {
            selectedCampaigns.push(campaign);
          }
        });
      });
    const { campaigns, ...params } = template;
    const newTemplate = this.datastore.createRecord(
      CommsTemplate,
      {
        ...params,
        campaign: selectedCampaigns[0]
      },
    );
    return newTemplate.save();
  }

  public removeTemplate(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CommsTemplate,
      `${id}`
    );
  }

  public fetchEvents(campaignId?: number | string): Observable<CommsEvent[]> {
    // if (!force) {
    //   const events = this.datastore.peekAll(CommsEvent);
    //   if (events && events.length > 0) {
    //     return of(events);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 },
      include: 'campaign,template'
    };
    if (campaignId) {
      params[`filter`] = { campaign_id: campaignId };
    }
    // Provider and message are not ready
    return this.datastore.findAll(
      CommsEvent,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchEvent(id: number | string): Observable<CommsEvent> {
    // if (!force) {
    //   const event = this.datastore.peekRecord(CommsEvent, `${id}`);
    //   if (event) {
    //     return of(event);
    //   }
    // }
    // Provider and message are not ready
    return this.datastore.findRecord(CommsEvent, `${id}`, { include: 'campaign,template' });
  }

  public createEvent(event: {
    name: string,
    channel: string,
    sendAt: string,
    status: string,
    targetId: number,
    targetType: string,
    campaignId: string,
    templateId: string,
    // providerId: string
  }): Observable<CommsEvent> {
    let selectedCampaign: CommsCampaign = null;
    let selectedTemplate: CommsTemplate = null;
    // let selectedProvider: CommsProvider = null;

    this.fetchCampaign(event.campaignId)
      .subscribe(campaign => {
        selectedCampaign = campaign;
      });
    this.fetchTemplate(event.templateId)
      .subscribe(template => {
        selectedTemplate = template;
      });
    // this.fetchProvider(event.providerId)
    // .subscribe(provider => {
    //   selectedProvider = provider;
    //   });

    const { campaignId, templateId, ...params } = event;
    const newEvent = this.datastore.createRecord(
      CommsEvent,
      {
        ...params,
        campaign: selectedCampaign,
        template: selectedTemplate,
      }
    );

    return newEvent.save();
  }

  public removeEvent(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CommsEvent,
      `${id}`
    );
  }

  public fetchCampaigns(): Observable<CommsCampaign[]> {
    // if (!force) {
    //   const campaigns = this.datastore.peekAll(CommsCampaign);
    //   if (campaigns && campaigns.length > 0) {
    //     return of(campaigns);
    //   }
    // }

    return this.datastore.findAll(
      CommsCampaign,
      {
        page: { size: 10, number: 1 }
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchCampaign(id: number | string): Observable<CommsCampaign> {
    // if (!force) {
    //   const campaign = this.datastore.peekRecord(CommsCampaign, `${id}`);
    //   if (campaign) {
    //     return of(campaign);
    //   }
    // }

    return this.datastore.findRecord(CommsCampaign, `${id}`, { include: 'events,templates' });
  }

  public createCampaign(campaign: {
    name: string, description: string, ownerId: number, ownerType: string, cognitoEndpointId: number
  }): Observable<CommsCampaign> {
    const newCampaign = this.datastore.createRecord(
      CommsCampaign,
      {
        ...campaign
      }
    );

    return newCampaign.save();
  }

  public removeCampaign(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CommsCampaign,
      `${id}`
    );
  }

  public fetchProviders(eventId?: number | string): Observable<CommsProvider[]> {
    // if (!force) {
    //   const providers = this.datastore.peekAll(CommsProvider);
    //   if (providers && providers.length > 0) {
    //     return of(providers);
    //   }
    // }
    const params = {
      page: { size: 10, number: 1 }
    };
    if (eventId) {
      params[`filter`] = { campaign_id: eventId };
    }

    return this.datastore.findAll(
      CommsProvider,
      {
        ...params
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  public fetchProvider(id: number | string): Observable<CommsProvider> {
    // if (!force) {
    //   const provider = this.datastore.peekRecord(CommsProvider, `${id}`);
    //   if (provider) {
    //     return of(provider);
    //   }
    // }

    return this.datastore.findRecord(CommsProvider, `${id}`);
  }

  public createProvider(provider: {
    name: string, encryptedSecret: string, encryptedSecretIv: string, key: string
  }): Observable<CommsProvider> {
    const newProvider = this.datastore.createRecord(
      CommsProvider,
      {
        ...provider
      }
    );

    return newProvider.save();
  }

  public removeProvider(id: number | string): Observable<Response> {
    return this.datastore.deleteRecord(
      CommsProvider,
      `${id}`
    );
  }

}
