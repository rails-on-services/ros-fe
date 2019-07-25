import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig } from 'angular2-jsonapi';

import { CognitoUser } from './models/user.model';
import { CognitoPool } from './models/pool.model';
import { CognitoApplication } from './models/applications.model';

const config: DatastoreConfig = {
  baseUrl: 'https://api.ros.rails-on-services.org/cognito',
  models: {
    users: CognitoUser,
    groups: CognitoPool,
    applications: CognitoApplication,
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class CognitoDatastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http);
  }
}
