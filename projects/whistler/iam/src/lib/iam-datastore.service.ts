import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig } from 'angular2-jsonapi';

import { IamUser } from './models/user.model';
import { IamGroup } from './models/group.model';
import { IamPolicy } from './models/policy.model';


const config: DatastoreConfig = {
  baseUrl: 'http://13.229.71.66:3000/iam',
  models: {
    users: IamUser,
    groups: IamGroup,
    policies: IamPolicy,
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
      super(http);
  }
}
