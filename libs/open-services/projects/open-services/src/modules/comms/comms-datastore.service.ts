import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig } from 'angular2-jsonapi';

import { CommsMessage } from './models/message.model';
import { CommsEvent } from './models/event.model';
import { CommsTemplate } from './models/template.model';
import { CommsCampaign } from './models/campaign.model';
import { CommsProvider } from './models/provider.model';

const config: DatastoreConfig = {
  baseUrl: 'https://api.ros.rails-on-services.org/comm',
  models: {
    messages: CommsMessage,
    events: CommsEvent,
    templates: CommsTemplate,
    campaigns: CommsCampaign,
    providers: CommsProvider
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class CommsDatastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
      super(http);
  }
}
