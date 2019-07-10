import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    preAuth: false,
    preAuthPath: '/preauth',
  };
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  apiHost: string;
  storageEndpoint: string;
  isAuthenticated: boolean;

  constructor(
    @Optional() config: EnvConfig,
    private http: HttpClient
  ) {
    if (!config) {
      config = new EnvConfig();
    }

    this.apiHost = config.env.apiHost;
    this.isAuthenticated = false;
    if (!config.env.production) {
      this.storageEndpoint = 'http://7339f4c0.ngrok.io/storage/';
    } else {
      this.storageEndpoint = config.env.preAuthPath;
    }
  }

  uploadFile(file: File) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
    });
    const options = { headers };

    return this.http.post(this.storageEndpoint, {
      params: {
        'form-data': {
          file
        }
      }
    },
      options);
  }
}
