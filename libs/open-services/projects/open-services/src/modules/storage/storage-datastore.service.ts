import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig } from 'angular2-jsonapi';

import { StorageFile } from './models/storage.model';

const config: DatastoreConfig = {
  // baseUrl: 'https://api.ros.rails-on-services.org/storage',
  baseUrl: 'https://d853ad1a.ngrok.io/storage',
  models: {
    files: StorageFile
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class StorageDatastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
      super(http);
  }
}
